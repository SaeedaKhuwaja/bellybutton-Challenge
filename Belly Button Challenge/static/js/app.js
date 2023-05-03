
// create a function to get the demograph information
function demoInfo(sample){
// console.log(sample);
  
  // get the metadata from the json file
  d3.json("samples.json").then((data) => {
    
    let metaData = data.metadata;
    // console.log(metaData);
    
    // filter the metaData by id
    var result = metaData.filter(demograph => demograph.id == sample);
    
    let demographData = result[0];
    // console.log(demographData)

    // clear the demograph into after the id is changed
    d3.select("#sample-metadata").html(" ")

    // use object.entries to get the value key pair
    Object.entries(demographData).forEach(([key, value]) => {
      d3.select("#sample-metadata")
        .append("h5").text(`${key}: ${value}`);
    })
  } ); 
}

// create a function that plots the bar graph
function bargraph(sample) {
  // console.log(sample)

  // get the sampledata from the json file
  d3.json("samples.json").then((data) => {
    
    let sampleData = data.samples;
    // console.log(sampleData);
    
    // filter the metaData by id
    let result = sampleData.filter(sampleResult => sampleResult.id == sample);
    // console.log(result)
    
    let demographData = result[0];
    // console.log(demographData);

    // get the otu_ids, labels and sample_values
    let otu_ids = demographData.otu_ids;
    let otu_labels = demographData.otu_labels;
    let sample_values = demographData.sample_values; 
    // console.log(otu_ids);
    // console.log(otu_labels);
    // console.log(sample_values);

    // getting values for first 10 ids only
    let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
    let xValues = sample_values.slice(0, 10);
    let textLabels = otu_labels.slice(0, 10);
    console.log(textLabels);

    // plotting the bar chart
    let barchart = {
      x: xValues.reverse(),
      y: yticks.reverse(),
      text: textLabels.reverse(),
      type: "bar",
      orientation: "h"
    }

    let layout = {
      title: "Top 10 OTUs"
    };

    Plotly.newPlot("bar", [barchart], layout);
  } ); 
}

function bubbleplot(sample) {
  // console.log(sample)

  // get the sampledata from the json file
  d3.json("samples.json").then((data) => {
    
    let sampleData = data.samples;
    // console.log(sampleData);
    
    // filter the metaData by id
    let result = sampleData.filter(sampleResult => sampleResult.id == sample);
    // console.log(result)
    
    let demographData = result[0];
    // console.log(demographData);

    // get the otu_ids, labels and sample_values
    let otu_ids = demographData.otu_ids;
    let otu_labels = demographData.otu_labels;
    let sample_values = demographData.sample_values; 

    // gathering data for bubble chart
    let bubblechart = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers",
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: "YlGnBu"
      }
    }

    let layout = {
      title: "Bacteria Culture Per Sample",
      hovermode: "closest",
      xaxis: {title: "OTU - ID"} 
    };

    Plotly.newPlot("bubble", [bubblechart], layout);

  })
};

// create a function to access the sample names and put in the drop down menu
function access()
{
  
  let data = d3.json("samples.json");
  console.log(data);

  //get the data from the json file using d3.json
  // let data = d3.json("samples.json");
  
  // access the drop down selector from the index.html file
  var select =  d3.select("#selDataset");
  
  // get the names data from the json file
  d3.json("samples.json").then((data) => {
    let samplenames = data.names;
      // console.log(samplenames);

    // put each sample name in the select variable to fill the dropdown menu
    samplenames.forEach((sample) => {
      select.append("option")
      .text(sample)
      .property("value" , sample)
    })

    // when the data is accessed, get the information for first sample
    let sample1 = samplenames[0];

    // call the function
    demoInfo(sample1);
    // call the function to plot the chart
    bargraph(sample1);
    // call the bubblechart function
    bubbleplot(sample1);
  })
}

// call the access function
access();

// create a function to define the optionChanged as to display the option selected from the dropdown
function optionChanged(item)
{
  // call the demograph function 
  demoInfo(item);
  
  // call the bargraph function
  bargraph(item);

  //call the bubblechart function
  bubbleplot(item);
}
