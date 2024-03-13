import koa from "koa";
import Router from "@koa/router";
import dotenv from "dotenv";
import bodyParser from "koa-bodyparser";
import axios from "axios";

dotenv.config();
const app = new koa();
const router = new Router();

app.use(bodyParser());
app.use(router.routes());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// :form_id/filteredResponses
router.get("/", async (ctx) => {
  try {
    const response = await axios.get(
      `https://api.fillout.com/v1/api/forms/${process.env.FORM_ID}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );
    console.log(ctx.request.query);

    // test object
    const filters: FilterClauseType[] = [
      {
        id: "nameId",
        condition: Condition.Equals,
        value: "Timmy",
      },
      {
        id: "kc6S6ThWu3cT5PVZkwKUg4",
        condition: Condition.LessThan,
        value: "2024-02-23T05:01:47.691Z",
      },
    ];
    const request = {
      responses: [
        {
          submissionId: "ab9959b2-73e8-4994-85b9-56e780b89ce3",
          submissionTime: "2024-02-27T19:37:08.228Z",
          lastUpdatedAt: "2024-02-27T19:37:08.228Z",
          questions: [
            {
              id: "nameId",
              name: "Anything else you'd like to share before your call?",
              type: "LongAnswer",
              value: "Timmy",
            },
            {
              id: "bE2Bo4cGUv49cjnqZ4UnkW",
              name: "What is your name?",
              type: "ShortAnswer",
              value: "Johnny",
            },
            {
              id: "dSRAe3hygqVwTpPK69p5td",
              name: "Please select a date to schedule your yearly check-in.",
              type: "DatePicker",
              value: "2024-02-01",
            },
            {
              id: "fFnyxwWa3KV6nBdfBDCHEA",
              name: "How many employees work under you?",
              type: "NumberInput",
              value: 2,
            },
            {
              id: "jB2qDRcXQ8Pjo1kg3jre2J",
              name: "Which department do you work in?",
              type: "MultipleChoice",
              value: "Engineering",
            },
            {
              id: "kc6S6ThWu3cT5PVZkwKUg4",
              name: "What is your email?",
              type: "EmailInput",
              value: "johnny@fillout.com",
            },
          ],
          calculations: [],
          urlParameters: [],
          quiz: {},
          documents: [],
        },

        {
          calculations: [],
          urlParameters: [],
          quiz: {},
          documents: [],
        },
      ],
      totalResponses: 11,
      pageCount: 1,
    };

    const { questions } = request.responses[0];

    // filter the responses
    let filteredResponses: any = [];

    if (filters.length == 0) {
      ctx.status = 200;
      ctx.body = "No filters provided. Please provide filters.";
      return;
    }
    if (filters.length > 0) {
      filteredResponses = filters.map((filter) => {
        const question = questions?.find(
          (question) => question.id === filter.id
        );
        if (!question) {
          return;
        }

        if (question.id == "birthdayId") {
          question.value = new Date(question.value).getTime();
          filter.value = new Date(filter.value).getTime();
        }
        // condition
        switch (filter.condition) {
          case Condition.Equals:
            if (question.value === filter.value) {
              return question;
            }
            break;
          case Condition.DoesNotEqual:
            if (question.value !== filter.value) {
              return question;
            }
            break;
          case Condition.GreaterThan:
            if (question.value > filter.value) {
              return question;
            }
            break;
          case Condition.LessThan:
            if (question.value < filter.value) {
              return question;
            }
            break;
          default:
            return;
        }
      });
    }
    console.log(filteredResponses, "filteredResponses");
    filteredResponses = filteredResponses.filter(
      (response: any) => response !== undefined
    );
    // MERGE THE FILTERED RESPONSES
    let finalResponse: any = [];

    // return JSON.stringify(response.data);
  } catch (error) {
    ctx.status = 500;
    ctx.body = error;
    return error;
  }
});

// YYYY-MM-DDTHH:mm:ss.sssZ
type FilterClauseType = {
  id: string;
  condition: Condition;
  value: number | string;
};

enum Condition {
  Equals = "equals",
  DoesNotEqual = "does_not_equal",
  GreaterThan = "greater_than",
  LessThan = "less_than",
}

// each of these filters should be applied like an AND in a "where" clause
// in SQL
// type ResponseFiltersType = ResponseFilter[];

function checkCondition(question: any, filter: any, condition: any) {
  switch (filter.condition) {
    case Condition.Equals:
      if (question.value === filter.value) {
        return question;
      }
      break;
    case Condition.DoesNotEqual:
      if (question.value !== filter.value) {
        return question;
      }
      break;
    case Condition.GreaterThan:
      if (question.value > filter.value) {
        return question;
      }
      break;
    case Condition.LessThan:
      if (question.value < filter.value) {
        return question;
      }
      break;
    default:
      return;
  }
}
