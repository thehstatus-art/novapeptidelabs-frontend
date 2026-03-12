import React from "react";

export default function ResearchPipeline(){

const compounds = [

{
name:"Retatrutide",
category:"Metabolic Research",
status:"Active Research"
},

{
name:"Tesamorelin",
category:"Growth Hormone Axis",
status:"Ongoing Study"
},

{
name:"MOTS-C",
category:"Mitochondrial Signaling",
status:"Active Research"
},

{
name:"BPC-157",
category:"Regenerative Pathways",
status:"Ongoing Study"
},

{
name:"KLOW-80",
category:"Longevity & Metabolic Signaling",
status:"Preclinical Research"
},

{
name:"GHK-CU",
category:"Copper Peptide Regeneration",
status:"Active Research"
},
{
name:"DSIP",
category:"Neuroregulatory Peptide",
status:"Preclinical Investigation"
},
{
name:"5-Amino-1MQ",
category:"Metabolic Enzyme Modulation",
status:"Emerging Research"
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

<h3 className="pipeline-name">{c.name}</h3>

<span className={`pipeline-status-badge ${c.status.replace(/\s+/g,'-').toLowerCase()}`}>
{c.status}
</span>

</div>

<p className="pipeline-cat">
{c.category}
</p>

<div className="pipeline-progress">

<div className="pipeline-bar">

<div
className="pipeline-fill"
style={{width: c.status.includes("Active") ? "90%" : c.status.includes("Ongoing") ? "70%" : "45%"}}
></div>

</div>

</div>

</div>

))}

</div>

</div>

)

}