import React from "react";

export default function ResearchPipeline(){

const compounds = [
  {
    name: "Retatrutide",
    category: "Metabolic Research",
    status: "Active Research",
    stage: "Phase 3",
    highlights: ["Triple agonist", "Metabolic signaling", "High demand"]
  },
  {
    name: "Tesamorelin",
    category: "Growth Hormone Axis",
    status: "Ongoing Study",
    stage: "Phase 2",
    highlights: ["GH axis", "Peptide standard", "Clinical interest"]
  },
  {
    name: "MOTS-C",
    category: "Mitochondrial Signaling",
    status: "Active Research",
    stage: "Phase 3",
    highlights: ["Cellular energy", "Exercise signaling", "Longevity interest"]
  },
  {
    name: "BPC-157",
    category: "Regenerative Pathways",
    status: "Ongoing Study",
    stage: "Phase 2",
    highlights: ["Repair models", "GI pathways", "High lab demand"]
  },
  {
    name: "KLOW-80",
    category: "Longevity & Metabolic Signaling",
    status: "Preclinical Research",
    stage: "Preclinical",
    highlights: ["Emerging interest", "Metabolic focus", "Novel compound"]
  },
  {
    name: "GHK-CU",
    category: "Copper Peptide Regeneration",
    status: "Active Research",
    stage: "Phase 3",
    highlights: ["Copper peptide", "Skin models", "Regeneration"]
  },
  {
    name: "DSIP",
    category: "Neuroregulatory Peptide",
    status: "Preclinical Investigation",
    stage: "Preclinical",
    highlights: ["Sleep signaling", "Neuropeptide", "Emerging studies"]
  },
  {
    name: "5-Amino-1MQ",
    category: "Metabolic Enzyme Modulation",
    status: "Emerging Research",
    stage: "Early Stage",
    highlights: ["NNMT focus", "Body composition", "High curiosity"]
  }
];

return(

<div className="pipeline-section">

<h2>Research Pipeline</h2>

<p className="pipeline-sub">
Investigating advanced peptide compounds in metabolic,
endocrine, and regenerative research models.
</p>

<div className="pipeline-grid">

{compounds.map((c,i)=>(

<div key={i} className="pipeline-card">

<div className="pipeline-card-top">
  <div>
    <h3 className="pipeline-name">{c.name}</h3>
    <div className="pipeline-stage">{c.stage}</div>
  </div>

  <span className={`pipeline-status-badge ${c.status.replace(/\s+/g, '-').toLowerCase()}`}>
    {c.status}
  </span>
</div>

<p className="pipeline-cat">
  {c.category}
</p>

<div className="pipeline-highlights">
  {c.highlights.map((item, index) => (
    <span key={index} className="pipeline-pill">{item}</span>
  ))}
</div>

<div className="pipeline-progress">
  <div className="pipeline-progress-label">
    <span>Research Progress</span>
    <strong>
      {c.status.includes("Active")
        ? "90%"
        : c.status.includes("Ongoing")
        ? "70%"
        : c.status.includes("Preclinical")
        ? "45%"
        : "30%"}
    </strong>
  </div>

  <div className="pipeline-bar">
    <div
      className="pipeline-fill"
      style={{
        width: c.status.includes("Active")
          ? "90%"
          : c.status.includes("Ongoing")
          ? "70%"
          : c.status.includes("Preclinical")
          ? "45%"
          : "30%"
      }}
    ></div>
  </div>
</div>

</div>

))}

</div>

</div>

)

}