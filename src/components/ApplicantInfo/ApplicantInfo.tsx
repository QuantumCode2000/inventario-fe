import { useEffect, useState } from "react";

function ApplicantInfo({
  applicantCI,
  setApplicantCI,
  fetchApplicantInformation,
  applicantInformation,
  setApplicantInformation,
  loading,
}) {
  const [withActa, setWithActa] = useState(false);

  useEffect(() => {
    if (applicantCI.length >= 7) {
      fetchApplicantInformation();
    } else {
      setApplicantInformation(null);
    }
  }, [applicantCI, fetchApplicantInformation, setApplicantInformation]);

  return (
    <div className="flex flex-col w-full p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Información del Solicitante
        </h2>
        <input
          type="text"
          value={applicantCI}
          onChange={(e) => setApplicantCI(e.target.value)}
          placeholder="Carnet Identidad Solicitante"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
        />
        <div className="grid grid-cols-2 gap-4 h-auto min-h-[150px]">
          {loading ? (
            <p className="mt-4 text-blue-500 col-span-2">Cargando...</p>
          ) : applicantInformation ? (
            <>
              <ApplicantCard
                label="Nombre"
                value={`${applicantInformation.militaryRank} ${applicantInformation.nombre}`}
              />
              <ApplicantCard
                label="Carnet Identidad"
                value={`${applicantInformation.ci} ${applicantInformation.extention}`}
              />
              <ApplicantCard
                label="Carnet Militar"
                value={`${applicantInformation.cm}`}
              />
            </>
          ) : (
            <p className="mt-4 text-red-500 col-span-2">
              Ingrese un CI de 7 dígitos para buscar la información del
              solicitante.
            </p>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Información del Motivo
        </h2>
        <div className="flex mb-4">
          <button
            type="button"
            className={`mr-4 py-2.5 px-5 text-sm font-medium rounded-lg transition duration-300 ease-in-out ${
              withActa
                ? "bg-blue-700 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick={() => setWithActa(true)}
          >
            Con Acta
          </button>
          <button
            type="button"
            className={`py-2.5 px-5 text-sm font-medium rounded-lg transition duration-300 ease-in-out ${
              !withActa
                ? "bg-gray-700 text-white"
                : "bg-gray-600 text-white hover:bg-gray-700"
            }`}
            onClick={() => setWithActa(false)}
          >
            Sin Acta
          </button>
        </div>
        {withActa ? (
          <select className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out">
            <option value="">Tipo de Solicitud</option>
            <option value="solicitud1">Solicitud 1</option>
            <option value="solicitud2">Solicitud 2</option>
            <option value="solicitud3">Solicitud 3</option>
          </select>
        ) : (
          <textarea
            placeholder="Describir el motivo"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
            rows="4"
          ></textarea>
        )}
      </div>
    </div>
  );
}

const ApplicantCard = ({ label, value }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow w-full">
      <>
        <div className="inline-flex items-center justify-between w-full">
          <div className="inline-flex items-center">
            <h3 className="font-bold text-lg text-gray-800">{label}</h3>
          </div>
        </div>
        <p className="mt-2 text-base text-gray-600">{value}</p>
      </>
    </div>
  );
};

export default ApplicantInfo;
