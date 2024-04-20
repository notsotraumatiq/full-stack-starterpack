import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
interface Physician {
  id: number;
  name: string;
}

interface Appointment {
  id: number;
  physicianId: number;
  patient: string;
  time: string;
  kind: string;
}
function App() {
  const [physicians, setPhysicians] = useState<Physician[]>([]);
  const [selectedPhysicianId, setSelectedPhysicianId] = useState<number>(0);
  const [appointments, setAppointments] = useState<Appointment[]>();
  const fetchPhysiciains = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/physicians");
      setPhysicians(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchPhysiciains();
  }, []);

  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <div className="bg-slate-400 h-1/2 shadow-m rounded-m">
        <div className="flex flex-col my-4 p-4">
          <h1 className="text-4xl font-bold text-blue-600 ">Test Cal</h1>
          <h4 className="text-lg font-bold uppercase my-5">Physicians</h4>
          <ul className="">
            {physicians.length > 0
              ? physicians.map((physician) => (
                  <li
                    key={physician.id}
                    className="my-1 cursor-pointer"
                    onClick={async () => {
                      try {
                        const response = await axiosInstance.get(
                          `/physicians/${physician.id}`
                        );

                        setAppointments(response.data);
                      } catch (error) {
                        console.error(error);
                      }
                      setSelectedPhysicianId(physician.id);
                    }}
                  >
                    <h5>{physician.name}</h5>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
      {selectedPhysicianId === 0 ? null : (
        <div className="flex flex-col text-left  h-1/2 px-2">
          <h4 className="text-5xl mt-10 mb-2 font-bold">
            {physicians[selectedPhysicianId].name}
          </h4>
          <h6 className="text-lg mb-10">
            {physicians[selectedPhysicianId].name + "email"}
          </h6>

          <div className="flex-1">
            {appointments === undefined || appointments.length === 0 ? null : (
              <table className="border-cyan-950">
                <thead>
                  <tr>
                    <th className="px-2 py-2">#</th>
                    <th className="px-2 py-2">Patient</th>
                    <th className="px-2 py-2">Time</th>
                    <th className="px-2 py-2">Kind</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => {
                    const timeString = new Date(
                      appointment.time
                    ).toLocaleTimeString();
                    return (
                      <tr key={appointment.id} className="px-2 py-2">
                        <td className="px-2 py-2">{appointment.id}</td>
                        <td className="px-2 py-2">{appointment.patient}</td>
                        <td className="px-2 py-2">{timeString}</td>
                        <td className="px-2 py-2">{appointment.kind}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
