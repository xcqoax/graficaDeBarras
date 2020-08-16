function cargar(){
    fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
         .then(response => response.json())
         .then(function(response){
    const { data } = response

    grafica(data);
   })
}

function grafica(datos){
   let datosGrafica = datos;

   const padding = 40
   const w = 800;
   const h = 500;
   const barWidth = (w)/275;

let informacion = d3.select('.areaGrafica').append('div')
                       .attr('id','masInfo')
                       .style('opacity', 0)

let xScale = d3.scaleLinear()
               .domain([0, datosGrafica.length - 1])
               .range([padding, w - padding])

let yScale = d3.scaleLinear()
               .domain([0, d3.max(datosGrafica, (d) => d[1])])
               .range([0 , h - (2 * padding)])  

let arrayFechas = datosGrafica.map((item) => new Date(item[0]))

let scaleEjeX = d3.scaleTime()
              .domain([d3.min(arrayFechas), d3.max(arrayFechas)])
              .range([padding, w - padding])

let scaleEjeY = d3.scaleLinear()
              .domain([0, d3.max(datosGrafica, (d) => d[1])])
              .range([h - padding, padding])


let svg = d3.select('.areaGrafica')
            .append('svg')
            .attr('width', w + 80)
            .attr('height', h)
            
let rectangulos = svg.selectAll('rect')
                     .data(datosGrafica)
                     .enter()
                     .append('rect')
                     .attr("width", (w - (2 * padding))/ datosGrafica.length) //barWidth
                     .attr('date-date', (d) => d[0])
                     .attr('data-gpd', (d) => d[1])
                     .attr("height", (d) =>  yScale(d[1]))
                     .attr('x', (d,i) => xScale(i))
                     .attr('y', (d) => (h - padding) - yScale(d[1]))
                     .on('mouseover', function (d,i){
                        informacion.transition()
                                    .duration(200)
                                    .style('opacity', .9);
                        informacion.html(d[0] + '<br>'+ '$ '+ d[1] + ' billion')
                        .style('left', (i * barWidth) + 30 + 'px')
                        .style('top', h + 50 + 'px')
                        .style('transform', 'translateX(10px)');          
                     })
                     .on('mouseout',function(d,i){
                        informacion.transition()
                                    .duration(200)
                                    .style('opacity', .0);
                     })

let yAxis = d3.axisLeft(scaleEjeY)
   
svg.append('g')
    .call(yAxis)
    .attr('id','ejeY')
    .attr('transform', 'translate('+ padding+ ', 0)')

let xAxis = d3.axisBottom(scaleEjeX)
   
svg.append('g')
    .call(xAxis)
    .attr('id','ejeX')
    .attr('transform', 'translate(0,' + (h - padding) +')')






























                     
                     

                     





    
   
  
}