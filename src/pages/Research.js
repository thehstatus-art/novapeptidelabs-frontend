import React from "react";

export default function Research() {

  const articles = [
    {
      title: "What is BPC-157?",
      desc: "Overview of the regenerative research peptide BPC-157 and its mechanisms in laboratory studies."
    },
    {
      title: "Understanding Peptide Storage",
      desc: "How peptides are stored in laboratory environments including temperature and stability considerations."
    },
    {
      title: "Retatrutide vs Semaglutide",
      desc: "Comparing two metabolic research compounds and their studied receptor pathways."
    },
    {
      title: "Thymosin Alpha-1 Research",
      desc: "Review of immunological studies and laboratory applications."
    }
  ];

  return (
    <div className="research-page">

      <h1>Research Library</h1>

      <p className="research-intro">
        Nova Peptide Labs provides educational resources for researchers
        studying peptide compounds and laboratory applications.
      </p>

      <div className="research-grid">

        {articles.map((a, i) => (
          <div key={i} className="research-card">

            <h3>{a.title}</h3>

            <p>{a.desc}</p>

            <button className="research-btn">
              Read Article
            </button>

          </div>
        ))}

      </div>

      <div className="research-disclaimer">
        All information is provided for educational and research purposes only.
        Nova Peptide Labs does not provide medical advice.
      </div>

    </div>
  );
}