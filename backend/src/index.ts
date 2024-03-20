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

app.listen(80, () => {
  console.log("Server running on port 80");
});

// :form_id/filteredResponses
router.get("/", async (ctx) => {
  let serverResponse;
  const filtersParam: any = ctx.query.query;
  try {
    serverResponse = await axios.get(
      `https://api.fillout.com/v1/api/forms/${process.env.FORM_ID}/submissions`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    );

    if (filtersParam.length == 0) {
      ctx.status = 200;
      ctx.body = "No filters provided. Please provide filters.";
      return;
    }

    const submissions: Response[] = serverResponse.data.responses;
    let submissionCount = 0;
    let filteredSubmissionQuestions: Response[] = [];

    submissions.forEach((submission) => {
      let filteredSubmission: any = {};
      let filteredQuestion = parseQuestions(
        submission.questions as Question[],
        filtersParam
      );

      if (filteredQuestion) {
        filteredSubmission = {
          ...submission,
        };
        filteredSubmission.questions = filteredQuestion;
        filteredSubmissionQuestions.push(filteredSubmission);
        submissionCount++;
      }
    });

    const finalResponse = {
      ...filteredSubmissionQuestions,
      totalResponses: submissionCount,
      pageCount: 1,
    };

    ctx.status = 200;
    ctx.body = filteredSubmissionQuestions;
    return;
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

interface Question {
  id: string;
  name: string;
  type: string;
  value: string | number | Date;
}

interface Response {
  submissionId?: string;
  submissionTime?: string;
  lastUpdatedAt?: string;
  questions: Question[];
  calculations?: any[];
  urlParameters?: any[];
  quiz?: object;
  documents?: any[];
}

interface finalResponse {
  responses: Response[];
  totalResponses: number;
  pageCount: number;
}

interface Request {
  responses: Response[];
  totalResponses: number;
  pageCount: number;
}

function parseQuestions(questions: Question[], filters: FilterClauseType[]) {
  let filteredTruth: boolean[] = [];

  filters.forEach((filter) => {
    const question: Question | undefined = questions.find(
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
    filteredTruth.push(
      evalCondition(question.value, filter.value, filter.condition)
    );
  });
  if (filteredTruth.every((truth) => truth)) {
    return questions;
  }
}

function evalCondition(
  questionValue: string | number | Date,
  filterValue: string | number,
  condition: Condition
) {
  switch (condition) {
    case Condition.Equals:
      return questionValue === filterValue;
    case Condition.DoesNotEqual:
      return questionValue !== filterValue;
    case Condition.GreaterThan:
      return questionValue > filterValue;
    case Condition.LessThan:
      return questionValue < filterValue;
  }
}
