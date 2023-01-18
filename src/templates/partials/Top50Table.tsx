import React from 'react';

function Top50Table({ top50 }) {
  return (
    <table className="md:w-3/12 mx-auto text-white mx-auto h-500 border-separate border border-slate-400">
      <thead>
        <tr>
          <th className="border border-slate-300">Word</th>
          <th className="border border-slate-300">Frequency</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(top50).map(([word, frequency], index) => (
          <tr key={index}>
            <td className="border border-slate-300">{word}</td>
            <td className="border border-slate-300">{frequency as number}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Top50Table;
