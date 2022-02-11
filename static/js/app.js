let samples_path = "./samples.json"

/* 
██╗███╗   ██╗██╗████████╗██╗ █████╗ ██╗     ██╗███████╗███████╗      
██║████╗  ██║██║╚══██╔══╝██║██╔══██╗██║     ██║╚══███╔╝██╔════╝      
██║██╔██╗ ██║██║   ██║   ██║███████║██║     ██║  ███╔╝ █████╗        
██║██║╚██╗██║██║   ██║   ██║██╔══██║██║     ██║ ███╔╝  ██╔══╝        
██║██║ ╚████║██║   ██║   ██║██║  ██║███████╗██║███████╗███████╗      
╚═╝╚═╝  ╚═══╝╚═╝   ╚═╝   ╚═╝╚═╝  ╚═╝╚══════╝╚═╝╚══════╝╚══════╝       
*/
function initialize()
{
    // access dropdown selector from index.html
    var select = d3.select("#selDataset");

    // get the names
    d3.json(samples_path).then((data) => {
        let subj_names = data.names;

        // add the ids/names to the dropdown menu
        subj_names.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);
        });
        // when initialized, call the demographicInfo function and pass the first sample to it
        let sample1 = subj_names[0];
        demographicInfo(sample1);
        // call buildBarChart function
        buildBarChart(sample1);
        // call buildBubbleChart function
        buildBubbleChart(sample1);
    });
}

/*
██╗   ██╗██████╗ ██████╗  █████╗ ████████╗███████╗                   
██║   ██║██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔════╝                   
██║   ██║██████╔╝██║  ██║███████║   ██║   █████╗                     
██║   ██║██╔═══╝ ██║  ██║██╔══██║   ██║   ██╔══╝                     
╚██████╔╝██║     ██████╔╝██║  ██║   ██║   ███████╗                   
 ╚═════╝ ╚═╝     ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝                   
*/
function optionChanged(item)
{
    // call demographicInfo function 
    demographicInfo(item);
    // call buildBarChart function
    buildBarChart(item);
    // call buildBubbleChart function
    buildBubbleChart(item);
}

/*
██████╗  ██████╗ ██████╗ ██╗   ██╗██╗      █████╗ ████████╗███████╗  
██╔══██╗██╔═══██╗██╔══██╗██║   ██║██║     ██╔══██╗╚══██╔══╝██╔════╝  
██████╔╝██║   ██║██████╔╝██║   ██║██║     ███████║   ██║   █████╗    
██╔═══╝ ██║   ██║██╔═══╝ ██║   ██║██║     ██╔══██║   ██║   ██╔══╝    
██║     ╚██████╔╝██║     ╚██████╔╝███████╗██║  ██║   ██║   ███████╗  
╚═╝      ╚═════╝ ╚═╝      ╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝  
                                                                     
███╗   ███╗███████╗████████╗ █████╗ ██████╗  █████╗ ████████╗ █████╗ 
████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
██╔████╔██║█████╗     ██║   ███████║██║  ██║███████║   ██║   ███████║
██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║  ██║██╔══██║   ██║   ██╔══██║
██║ ╚═╝ ██║███████╗   ██║   ██║  ██║██████╔╝██║  ██║   ██║   ██║  ██║
╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
*/
function demographicInfo(sample)
{
    d3.json(samples_path).then((data) => {
        // get metadata, filter by the selected value
        let metadata = data.metadata;
        let result = metadata.filter(sampleResult => sampleResult.id == sample);
        let resultData = result[0];

        // clear the metadata from the page so the new metadata can be added
        d3.select("#sample-metadata").html("");
        
        // now get the value key pairs out and add them to the page
        Object.entries(resultData).forEach(([key, value]) => {
            d3.select("#sample-metadata")
                .append("h5")
                .text(`${key}: ${value}`)
        });
    });
}

/*
██████╗ ██╗   ██╗██╗██╗     ██████╗                                  
██╔══██╗██║   ██║██║██║     ██╔══██╗                                 
██████╔╝██║   ██║██║██║     ██║  ██║                                 
██╔══██╗██║   ██║██║██║     ██║  ██║                                 
██████╔╝╚██████╔╝██║███████╗██████╔╝                                 
╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝                                  
                                                                     
 ██████╗ ██████╗  █████╗ ██████╗ ██╗  ██╗███████╗                    
██╔════╝ ██╔══██╗██╔══██╗██╔══██╗██║  ██║██╔════╝                    
██║  ███╗██████╔╝███████║██████╔╝███████║███████╗                    
██║   ██║██╔══██╗██╔══██║██╔═══╝ ██╔══██║╚════██║                    
╚██████╔╝██║  ██║██║  ██║██║     ██║  ██║███████║                    
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚══════╝                    
*/
function buildBarChart(sample)
{
    d3.json(samples_path).then((data) => {
        // get sample data, filter by the selected value
        let sampleData = data.samples;
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        let resultData = result[0];
        
        otu_ids = resultData.otu_ids;
        otu_labels = resultData.otu_labels;
        sample_values = resultData.sample_values;
        
        // build bar chart
        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        let xValues = sample_values.slice(0, 10);
        let textLabels = sample_values.slice(0, 10);
        
        let barChart = {
            y: yticks.reverse(),
            x: xValues.reverse(),
            text: textLabels.reverse(),
            type: "bar",
            orientation: "h"
        };

        let layout = {
            title: "Top 10 bellybutton bacteria"
        };

        Plotly.newPlot("bar", [barChart], layout);
    });
}

function buildBubbleChart(sample)
{
    d3.json(samples_path).then((data) => {
        // get sample data, filter by the selected value
        let sampleData = data.samples;
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);
        let resultData = result[0];
        
        otu_ids = resultData.otu_ids;
        otu_labels = resultData.otu_labels;
        sample_values = resultData.sample_values;
        
        // build bubble chart
        let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers", 
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        let layout = {
            title: "Bacterial Cultures per Sample", 
            hovermode: "closest", 
            xaxis: {title: "OTU ID"}
        };

        Plotly.newPlot("bubble", [bubbleChart], layout);
    });
}

// call initialize() function
initialize();