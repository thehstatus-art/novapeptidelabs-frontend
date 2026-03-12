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

<h3>{c.name}</h3>

<p className="pipeline-cat">
{c.category}
</p>

<span className="pipeline-status">
{c.status}
</span>

</div>

))}

</div>

</div>

)

}