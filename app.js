const data= [
    {gene: 'Gene1', expression: 10},
    {gene: 'Gene2', expression: 20},
    {gene: 'Gene3', expression: 30}
];

//dimension margins
const margin= {top: 20, right: 30, bottom: 40, left: 20};
const width= 500- margin.left- margin.right;
const height= 300- margin.top-margin.bottom;

//SVG container
const svg= d3.select("#Visualization")
    .append("svg")
    .attr("width", width+ margin.left+ margin.right)
    .attr("height", height+ margin.top+ margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
    
//create scale
const x= d3.scaleBand()
    .domain(data.map(d=> d.expression))
    .range([0, width])
    .padding(0.1);

const y= d3.scaleLinear()
    domain([0, data.map(d=> d.expression)])
    .nice()
    .range([height, 0]);

//add bars
svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", d=> x(d.gene))
    .attr("y", d=>y(d.expression))
    .attr("width", x.bandwidth())
    .attr("height", d=>height- y(d.expression));

//add x-axis
svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));
    
//add y-axis
svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y));
    