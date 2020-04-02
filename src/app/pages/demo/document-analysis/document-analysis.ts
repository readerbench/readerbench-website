import * as _ from 'underscore';
import { Component, OnInit } from '@angular/core';
import { ApiRequestService } from '../api-request.service';
import * as d3 from 'd3';
import { HierarchyNode, treemap, tree } from 'd3';
import { Options } from 'ng5-slider';

interface Language {
  id: string;
  description: string;
}

@Component({
  selector: 'document-analysis',
  styleUrls: ['./document-analysis.scss'],
  templateUrl: './document-analysis.html',
  providers: [ApiRequestService]
})
export class DocumentAnalysisComponent implements OnInit{


  private sliderValueArgument: number = 0.2;
  private sliderValueContent: number = 0.1;
  private sliderValueTopic: number = 0.2;
  private sliderValueSemantic: number = 0.8;
  options: Options = { floor: 0, ceil: 1, step: 0.1, showTicks: true };
  private text: string;
  private languages = [{id: 'en', description: 'English'}]
  private selectedLanguage: Language;


  private textInput1: string = "In the long term, going green is a Utopian ideal to which we must aspire if life is to continue on this planet. However in doing so we must also leave as small a footprint on humanity as we are able. Incentives for invention are worthwhile. Penalties for overindulgence are worthwhile. It is more important that society train itself in the mindset of good stewardship than it is that the electric car obliterate the need for oil inside of 10 years. The truth of consummation is that humans will always consume natural resources. We do so at a lower rate per capita today than we did in the 1970s and that trend is continuing. It is better that the trend continue than that humans ever find a single solution that allows us to indulge our whims without a requirement of stewardship. May you enjoy a rainbow of environmental possibilities, the color green among them.\n" +
      "The buzzword for the environmentally conscious is \"green\". Environmentalists want Americans to believe that green is good and that every other way to live will condemn humanity, and indeed all of nature into an existence that makes Hades look like Club Med. At the same time, industrialists are clamoring to get out the word that the earth is so resilient that eating coal dust is essential for a long and healthy life. The answer is likely somewhere in the middle. Moderates understand the value of good stewardship of our natural resources, but they also understand that the conversion process takes time and comes with some hefty price tags. Here are three benefits to the United States choosing to \"Go Green\" and three drawbacks that must be considered in any plan to do so.\n" +
      "The Good\n" +
      "Learning to use our natural resources with respect to how finite they are will serve future generations and prolong the amount of time that the earth will continue to sustain life. No matter how you view the world's resources, the one thing everyone can agree on is that natural resources do not exist in limitless supplies.\n" +
      "Creating new environmentally friendly products and refitting the world with such items will create jobs. Jobs in new technology sectors have traditionally been high paying. Going green is good for workers, and therefore good for the economy.\n" +
      "Necessity is the mother of invention. When laws limit people, human ingenuity finds its foothold and invention takes the place of convention. With the introduction of new laws that force companies to find green alternatives come up with inventive plans that increase productivity, quality, and in some cases even revolutionize the way we do things.\n" +
      "The Bad\n" +
      " While going green may be good for the long-term economy, companies are the ones who must shoulder the financial burden of unsure investments. That which looks possible from the outset is often mired in more hoopla and expense than it is in reality. When companies lose money on such investments, workers lose jobs, companies go under, and the economy crumbles.\n" +
      "Going green eats up time for productivity. In the 1970's nearly every juice bottle, pop can, and newspaper found its way into a landfill. Today, people stop for an extra few seconds or minutes to separate recyclables from true garbage. While it's arguably good for the environment, the fact is that 3 minutes per week over 300 million citizens take up 7,800,000,000 man-hours of time per year. The smallest bits of time taken to go green, when spread out over the whole of the citizenry will adversely affect the gross national product.\n" +
      "When new industries grab a foothold, old industries will fall by the wayside, causing an avalanche of job loss, financial hardship, and in some cases catastrophic poverty. Imagine if every oil-producing nation was suddenly left without any viable resources because the world suddenly switched to another form of energy. Those people are our trading partners. The world has gone global. To destroy an industry in a developing nation now costs us money and jobs here in the United States.";
  private textInput2: string = "It’s time to take…a look at how Singapore’s transportation policymakers deal with the tyranny of the automobile.\n" +
      "Start with Singapore’s general approach to every policy issue. The overarching premise is that the government intends to run the country with a business-driven perspective. That’s an idea you’d think would appeal to President Bush, America’s first MBA chief executive….\n" +
      "So what is it that the Singaporean government has crafted as its comprehensive policy approach to the auto? The first thing you need to know is, if you want to buy a car in Singapore, you first must buy a permit to buy a car…. The current price is roughly $10,000 for a midsize car. And here’s the policy kicker: The money goes into supporting an efficient, highly developed mass transit system, which today handles about 4 million rides per day, compared with 3 million daily private auto trips.\n" +
      "Taxes are the other energy-conserving measure adopted by the Singaporean government. In particular, car buyers pay an annual tax that specifically punishes high-powered, gas-guzzling engines. But for every stick there’s a carrot: The government awards a lump sum tax rebate of 40% of the price of a vehicle to Singaporeans who opt for hybrids. As any public policy wonk will tell you, tax policy is public policy. In the case of Singapore, the policy message is clear: Gasoline is scarce and expensive — and likely only to become more so. Tax policies that encourage conservation and punish waste just make sense….\n" +
      "These are just a few of the thoughtfully aligned policy incentives adopted in Singapore. More important, perhaps, Singapore is only one of many places in the world that is making energy conservation and auto management a priority. Just as globalization has made American companies learn from other businesses around the world, so the opportunity exists for mayors, governors and even members of Congress and White House officials to learn from more advanced, more adventurous nations.";
  private textInput3: string = "America has a problem and the world has a problem. America’s problem is that it has lost its way in recent years — partly because of 9/11 and partly because of the bad habits that we have let build up over the last three decades, bad habits that have weakened our society’s ability and willingness to take on big challenges.\n" +
      "The world also has a problem: It is getting hot, flat, and crowded. That is, global warming, the stunning rise of middle classes all over the world, and rapid population growth have converged in a way that could make our planet dangerously unstable. In particular, the convergence of hot, flat, and crowded is tightening energy supplies, intensifying the extinction of plants and animals, deepening energy poverty, strengthening petro-dictatorship, and accelerating climate change. How we address these interwoven global trends will determine a lot about the quality of life on earth in the twenty-first century.\n" +
      "I am convinced that the best way for America to solve its big problem — the best way for America to get its “groove” back — is for us to take the lead in solving the world’s big problem. In a world that is getting hot, flat, and crowded, the task of creating the tools, systems, energy sources, and ethics that will allow the planet to grow in cleaner, more sustainable ways is going to be the biggest challenge of our lifetime.\n" +
      "But this challenge is actually an opportunity for America. If we take it on, it will revive America at home, reconnect America abroad, and retool America for tomorrow. America is always at its most powerful and most influential when it is combining innovation and inspiration, wealth building and dignity-building, the quest for big profits and the tackling of big problems. When we do just one, we are less than the sum of our parts. When we do both, we are greater than the sum of our parts — much greater.";
  private textInput4: string = "Few things are more appealing in politics than something for nothing. As Congress begins considering anti-global-warming legislation, environmentalists hold out precisely that tantalizing prospect: We can conquer global warming at virtually no cost. Here’s a typical claim, from the Environmental Defense Fund (EDF): “For about a dime a day [per person], we can solve climate change, invest in a clean energy future, and save billions in imported oil.”\n" +
      "This sounds too good to be true, because it is….The claims of the Environmental Defense Fund and other environmentalists ….rely on economic simulations by “general equilibrium” models. An Environmental Protection Agency study put the cost as low as $98 per household a year, because high energy prices are partly offset by government rebates. With 2.5 people in the average household, that’s roughly 11 cents a day per person.\n" +
      "The trouble is that these models embody wildly unrealistic assumptions: There are no business cycles; the economy is always at “full employment”; strong growth is assumed, based on past growth rates; the economy automatically accommodates major changes—if fossil fuel prices rise (as they would under anti-global-warming laws), consumers quickly use less and new supplies of “clean energy” magically materialize.\n" +
      "There’s no problem and costs are low, because the models say so. But the real world, of course, is different….\n" +
      "Countless practical difficulties would arise in trying to wean the U.S. economy from today’s fossil fuels. One estimate done by economists at the Massachusetts Institute of Technology found that meeting most transportation needs in 2050 with locally produced biofuels would require “500 million acres of U.S. land—more than the total of current U.S. cropland.” America would have to become a net food importer….\n" +
      "The selling of the green economy involves much economic make-believe. Environmentalists not only maximize the dangers of global warming—from rising sea levels to advancing tropical diseases—they also minimize the costs of dealing with it. Actually, no one involved in this debate really knows what the consequences or costs might be. All are inferred from models of uncertain reliability.";




  // private textInput1: string = "In the long term, going green is a Utopian ideal to which we must aspire if life is to continue on this planet.";
  // private textInput2: string = "It’s time to take…a look at how Singapore’s transportation policymakers deal with the tyranny of the automobile.";
  // private textInput3: string = "America has a problem and the world has a problem. America’s problem is that it has lost its way in recent years — partly because of 9/11 and partly because of the bad habits that we have let build up over the last three decades, bad habits that have weakened our society’s ability and willingness to take on big challenges.";
  // private textInput4: string = "Few things are more appealing in politics than something for nothing. As Congress begins considering anti-global-warming legislation, environmentalists hold out precisely that tantalizing prospect: We can conquer global warming at virtually no cost.";

  // private textInput1: string = "";
  // private textInput2: string = "";
  // private textInput3: string = "";
  // private textInput4: string = "";

  private myColor = d3.scaleOrdinal().domain(["1","25"]).range(d3.schemeSet3);//d3.scaleSequential().domain([1,20]).interpolator(d3.interpolateViridis);
  //private myColor = d3.scaleLinear().domain([1,20]).range([d3.rgb("#007AFF"), d3.rgb('#FFF500')]);
  private pharagraphContor = 0;
  private texts = [];
  private documentTreeData = null;

  private nameToNode = {};

  private treeDataCopy = null;
  private argumentOverlapConnections = [];
  private contentOverlapConnections = [];
  private topicOverlapConnections = [];
  private semanticLsaConnections = [];
  private corefConnections = [];
  private loading = false;

  constructor(private apiRequestService: ApiRequestService) {

   }

  ngOnInit() {
    document.getElementById('button-Multi-Doc overview').click();
    this.selectedLanguage = this.languages[0];
  }

  private cleanData() {
    d3.select(".container-documents-analysis").selectAll("*").remove();
    d3.select(".edges-legend-container").selectAll("*").remove();
    d3.select(".multi-document-cohesion-grid-content-svg").selectAll("*").remove();
  }

  private showGraph() {
    this.cleanData();

    var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 3000 - margin.left - margin.right,
    height = 1500 - margin.top - margin.bottom;
    var svg = d3.select(".container-documents-analysis").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

    if (this.textInput1 !== "") {this.texts.push({"text": this.textInput1});}
    if (this.textInput2 !== "") {this.texts.push({"text": this.textInput2});}
    if (this.textInput3 !== "") {this.texts.push({"text": this.textInput3});}
    if (this.textInput4 !== "") {this.texts.push({"text": this.textInput4});}

    this.getProcessedData(this.texts, this.selectedLanguage.id, svg);
    this.addLegend();

  }

  private getProcessedData(texts, language, svg) {

      this.loading = true;
    this.apiRequestService.setApiService('cna-graph');
      const process = this.apiRequestService.process({
          texts: texts,
          lang: language,
          models:  [{"model": "word2vec", "corpus": "coca"}, {"model": "lsa", "corpus": "coca"}]
      });
      process.subscribe(response => {
          this.documentTreeData = [];
          this.documentTreeData = response.data;
          this.treeDataCopy = response.data;

          Object.keys(this.treeDataCopy.edges).forEach(key => {
              let value = this.treeDataCopy.edges[key];
              if (key === 'LEXICAL_OVERLAP: ARGUMENT_OVERLAP') {
                  this.argumentOverlapConnections = value;
              } else if (key === 'LEXICAL_OVERLAP: CONTENT_OVERLAP') {
                  this.contentOverlapConnections = value;
              } else if (key === 'LEXICAL_OVERLAP: TOPIC_OVERLAP') {
                  this.topicOverlapConnections = value;
              } else if (key === 'SEMANTIC: WORD2VEC(coca)') {
                  this.semanticLsaConnections = value;
              } else if (key === 'COREF') {
                  this.corefConnections = value;
              }
          });

          this.loading = false;
          this.displayDiagram(this.treeDataCopy, svg, this.argumentOverlapConnections,this.contentOverlapConnections,  this.topicOverlapConnections, this.semanticLsaConnections,
              this.corefConnections, this.sliderValueArgument, this.sliderValueContent, this.sliderValueTopic, this.sliderValueSemantic );
          // return response.data;
      });
  }

  private addLegend() {
        // select the svg area
    var svgLegend = d3.select(".edges-legend-container").append("svg")
    .attr("width", 800)
    .attr("height", 250);

    // Handmade legend
    //svgLegend.append("circle").attr("cx",200).attr("cy",100).attr("r", 6).style("fill", "blue");
    svgLegend.append("circle").attr("cx",200).attr("cy",130).attr("r", 6).style("fill", "green");
    svgLegend.append("circle").attr("cx",200).attr("cy",160).attr("r", 6).style("fill", "orange");
    svgLegend.append("circle").attr("cx",200).attr("cy",190).attr("r", 6).style("fill", "purple");
    svgLegend.append("circle").attr("cx",200).attr("cy",220).attr("r", 6).style("fill", "black");
    //svgLegend.append("text").attr("x", 220).attr("y", 100).text("Lexical Overlap Link (Argument)").style("font-size", "18px").attr("alignment-baseline","middle");
    svgLegend.append("text").attr("x", 220).attr("y", 130).text("Lexical Overlap Link (Content)").style("font-size", "18px").style("font-weight", "bold").attr("alignment-baseline","middle");
    svgLegend.append("text").attr("x", 220).attr("y", 160).text("Lexical Overlap Link (Topic)").style("font-size", "18px").style("font-weight", "bold").attr("alignment-baseline","middle");
    svgLegend.append("text").attr("x", 220).attr("y", 190).text("Semantic Link (word2vec trained on COCA corpus)").style("font-weight", "bold").style("font-size", "18px").attr("alignment-baseline","middle");
    svgLegend.append("text").attr("x", 220).attr("y", 220).text("Co-reference Link").style("font-size", "18px").style("font-weight", "bold").attr("alignment-baseline","middle");

  }

  private displayDiagram(treeData, svg, argumentOverlapConnections, contentOverlapConnections,  topicOverlapConnections, semanticLsaConnections,
    corefConnections, sliderValueArgument, sliderValueContent,sliderValueTopic, sliderValueSemantic ) {
    var _this = this;
    // Set the dimensions and margins of the diagram
    var margin = {top: 20, right: 90, bottom: 30, left: 90},
        width = 3000 - margin.left - margin.right,
        height = 1500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    // var svg = d3.select(".container-documents-analysis").append("svg")
    //     .attr("width", width + margin.right + margin.left)
    //     .attr("height", height + margin.top + margin.bottom)
    //   .append("g")
    //     .attr("transform", "translate("
    //           + margin.left + "," + margin.top + ")");

    var i = 0,
        duration = 750,
        root;

    // declares a tree layout and assigns the size
    var treemap = d3.tree().size([height, width]);

    // Assigns parent, children, height, depth
    root = d3.hierarchy(treeData, function(d: any) { return d.children; });
    root.x0 = height / 2;
    root.y0 = 0;

    // Collapse after the second level
    //root.children.forEach(collapse);

    update(root, argumentOverlapConnections,contentOverlapConnections,  topicOverlapConnections, semanticLsaConnections,
      corefConnections, sliderValueArgument, sliderValueContent,sliderValueTopic, sliderValueSemantic );

    // Collapse the node and all it's children
    // function collapse(d) {
    //   if(d.children) {
    //     d._children = d.children
    //     d._children.forEach(collapse)
    //     d.children = null
    //   }
    // }

    function update(source, argumentOverlapConnections,contentOverlapConnections,  topicOverlapConnections, semanticLsaConnections,
      corefConnections, sliderValueArgument, sliderValueContent,sliderValueTopic, sliderValueSemantic ) {
      // Assigns the x and y position for the nodes
      var treeData = treemap(root);

      // Compute the new tree layout.
      var nodes = treeData.descendants(),
          links = treeData.descendants().slice(1);

      // Normalize for fixed-depth.
      nodes.forEach(function(d){ d.y = d.depth * 180});

      // ****************** Nodes section ***************************

      // Update the nodes...
      var node = svg.selectAll('g.node')
          .data(nodes, function(d: any) {return d.id || (d.id = ++i); });

      // Enter any new modes at the parent's previous position.
      var nodeEnter = node.enter().append('g')
          .attr('class', 'node')
          .attr("transform", function(d) {
            return "translate(" + source.x0 + "," + source.y0*10 + ")";
        })
        .on('click', click);

    // Define the div for the tooltip
    var valueNode = d3.select("body").append("div")
        .attr("class", "tooltipValue")
        .attr("width", 100)
        .attr("height", 50)
        //.style("opacity", 0)
        ;


      // Add Circle for the nodes
      nodeEnter.append('circle')
          .attr('class', 'node')
          .attr('r', function (d: any) {
            return d.data.importance == 0 ? 2 : d.data.importance;
          })
          // .style("visibility", function(d: any) {
          //   return d.parent == null ? 'hidden' : '';
          // })
        .attr('id', function(d: any) { return d.data.name; })
          // .style("fill", function(d: any) {
          //     return d._children ? "lightsteelblue" : "#fff";
          // })
        .style("fill", function (d: any) {
          if (d.data.type === 3) {
            var color = _this.myColor(d.id);
            d.data.color = color;
            return color;
          } else if (d.parent !== null && d.parent.data.type === 3) {
            return d.parent.data.color;
          } else {
            return '#fff';
          }
        })
          .on('mouseover', function (d: any) {
              valueNode.transition()
                    .duration(200)
                    .style("opacity", .9);
              valueNode.html(d.data.value)
                .style("left", (d3.event.pageX) - 210 + "px")
                .style("top", (d3.event.pageY - 28) + "px");

            })
            .on('mouseout', function (d) {
          if (d.data.type === 3) {
            var color = _this.myColor(d.id);
            d.data.color = color;
            return color;
          } else if (d.parent !== null && d.parent.data.type === 3) {
            return d.parent.data.color;
          } else {
            return '#fff';
          }
              valueNode.transition()
                .duration(500)
                .style("opacity", 0);
            });

      // Add labels for the nodes
      nodeEnter.append('text')
          .attr("dy", "1.35em")
          .attr("x", function(d: any) {
              return d.children || d._children ? -13 : -70;
          })
          .attr("text-anchor", function(d: any) {
              return d.children || d._children ? "end" : "start";
          })
          .text(function(d: any) { return d.data.name; })
          .style("font-weight", "bold")
          .style("font-size", "18px");

      // UPDATE
      var nodeUpdate = nodeEnter.merge(<any>node);

      // Transition to the proper position for the node
      nodeUpdate.transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "translate(" + d.y+ "," + d.x + ")";
            //return "translate(" + d.x+ "," + d.y + ")"; for vertical
         });

      // Update the node attributes and style
      nodeUpdate.select('circle.node')
        .attr('r', function (d: any) {
          return d.data.importance == 0 ? 2 : d.data.importance;
        })
        .style("fill", function(d: any) {
            // return d._children ? "lightsteelblue" : "#fff";
            if (d.data.type === 3) {
              var color = _this.myColor(d.id);
              d.data.color = color;
              return color;
            } else if (d.parent !== null && d.parent.data.type === 3) {
              return d.parent.data.color;
            } else {
              return '#fff';
            }
        })
        .attr('cursor', 'pointer');


      // Remove any exiting nodes
      var nodeExit = node.exit().transition()
          .duration(duration)
          .attr("transform", function(d: any) {
              //return "translate(" + source.x + "," + source.y + ")"; //for vertical
              return "translate(" + source.y + "," + source.x + ")";
          })
          .remove();

      // On exit reduce the node circles size to 0
      nodeExit.select('circle')
        .attr('r', 1e-6);

      // On exit reduce the opacity of text labels
      nodeExit.select('text')
        .style('fill-opacity', 1e-6);

      // ****************** links section ***************************

      // Update the links...
      var link = svg.selectAll('path.link')
          .data(links, function(d: any) { return d.id; });

      // Enter any new links at the parent's previous position.
      var linkEnter = link.enter().insert('path', "g")
          .attr("class", "link")
          .attr('d', function(d: any){
            var o = {x: source.x0, y: source.y0*10}
            //var o = {y: source.y0, x: source.x0} //for vertical
            return diagonal(o, o)
          });

      // UPDATE
      var linkUpdate = linkEnter.merge(<any>link);

      // Transition back to the parent element position
      linkUpdate.transition()
          .duration(duration)
          .attr('d', function(d){ return diagonal(d, d.parent) });

      // Remove any exiting links
      var linkExit = link.exit().transition()
          .duration(duration)
          .attr('d', function(d) {
            var o = {x: source.x, y: source.y}
            return diagonal(o, o)
          })
          .remove();

      // Store the old positions for transition.
      nodes.forEach(function(d: any){
        d.x0 = d.x;
        d.y0 = d.y;
      });

      nodes.forEach(function (n: any) {
       _this.nameToNode[n.data.name] = n;
      });

    // Define the div for the tooltip
    var weightTooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Change this as you wish
    //createEdges(argumentOverlapConnections,_this.sliderValueArgument, 'connection1', 'Lexical Overlap Link (Argument)'); //LEXICAL_OVERLAP: ARGUMENT_OVERLAP
    _this.createEdges(svg, weightTooltip, contentOverlapConnections,_this.sliderValueContent, 'connection2', 'Lexical Overlap Link (Content)'); //LEXICAL_OVERLAP: CONTENT_OVERLAP
    _this.createEdges(svg, weightTooltip, topicOverlapConnections, _this.sliderValueTopic, 'connection3', 'Lexical Overlap Link (Topic)'); //LEXICAL_OVERLAP: TOPIC_OVERLAP
    _this.createEdges(svg, weightTooltip, semanticLsaConnections, _this.sliderValueSemantic, 'connection4', 'Semantic Link (word2vec trained on COCA corpus)'); //SEMANTIC: WORD2VEC(coca)
    _this.createEdges(svg, weightTooltip, corefConnections, null, 'connection5', 'Co-reference Link'); //COREF


      // Creates a curved (diagonal) path from parent to the child nodes
      function diagonal(s, d) {

        //horizontal
        var path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`

        //vertical
        // var path = `M ${s.x} ${s.y}
        // C ${(s.x + d.x) / 2} ${s.y},
        //   ${(s.x + d.x) / 2} ${d.y},
        //   ${d.x} ${d.y}`

        return path;
      }

      // Toggle children on click.
      function click(d) {
        if (d.children) {
          d3.selectAll(".connection1").remove();
          d3.selectAll(".connection2").remove();
          d3.selectAll(".connection3").remove();
          d3.selectAll(".connection4").remove();
          d3.selectAll(".connection5").remove();
          d._children = d.children;
          d.children = null;

        } else {
          d3.selectAll(".connection1").remove();
          d3.selectAll(".connection2").remove();
          d3.selectAll(".connection3").remove();
          d3.selectAll(".connection4").remove();
          d3.selectAll(".connection5").remove();
          d.children = d._children;
          d._children = null;
        }


        update(d, argumentOverlapConnections,contentOverlapConnections,  topicOverlapConnections, semanticLsaConnections,
          corefConnections, sliderValueArgument, sliderValueContent,sliderValueTopic, sliderValueSemantic);
      }
    }
  }

    private createEdges(svg, weightTooltip, edges, threshold, className, typeLegend) {
      var _this = this;
        edges.forEach(function (arcLink) {

            if (arcLink.weight) {
                if(parseFloat(arcLink.weight) > threshold) {
                    var path = d3.path();
                    var xSource = _this.nameToNode[arcLink.source].y;
                    var ySource = _this.nameToNode[arcLink.source].x;
                    var xTarget = _this.nameToNode[arcLink.target].y;
                    var yTarget = _this.nameToNode[arcLink.target].x;
                    path.arc(xSource, (ySource + yTarget)/2, (Math.abs(yTarget - ySource))/2, -0.5 * Math.PI, 0.5 * Math.PI, false);

                    var pathString = path.toString();

                    var pathId = arcLink.source + arcLink.target;
                    svg.append("path")
                        .attr("d", pathString)
                        .attr("id", pathId)
                        .attr('class', className)
                        .attr("fill", "none")
                        .on('mouseover', function (d) {
                            d3.select(this).attr('class', 'pathMouseover');
                            d3.selectAll('[id=\''+ arcLink.source + '\']').style('fill', 'red');
                            d3.selectAll('[id=\''+ arcLink.target + '\']').style('fill', 'red');
                            weightTooltip.transition()
                                .duration(200)
                                .style("opacity", .9);
                            weightTooltip.html(typeLegend + "</br>" + arcLink.source + " => " + arcLink.target + "</br>" +parseFloat(arcLink.weight).toFixed(3))
                                .style("color", "red")
                                .style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY - 28) + "px")
                                .style("vertical-align", "middle");

                        })
                        .on('mouseout', function (d) {
                            d3.select(this).attr('class', className);
                            d3.selectAll('[id=\''+ arcLink.source + '\']').style("fill", function(d: any) {
                                // return d._children ? "lightsteelblue" : "#fff";
                                if (d.data.type === 3) {
                                    var color = _this.myColor(d.id);
                                    d.data.color = color;
                                    return color;
                                } else if (d.parent !== null && d.parent.data.type === 3) {
                                    return d.parent.data.color;
                                } else {
                                    return '#fff';
                                }
                            })
                            d3.selectAll('[id=\''+ arcLink.target + '\']').style("fill", function(d: any) {
                                // return d._children ? "lightsteelblue" : "#fff";
                                if (d.data.type === 3) {
                                    var color = _this.myColor(d.id);
                                    d.data.color = color;
                                    return color;
                                } else if (d.parent !== null && d.parent.data.type === 3) {
                                    return d.parent.data.color;
                                } else {
                                    return '#fff';
                                }
                            })
                            weightTooltip.transition()
                                .duration(500)
                                .style("opacity", 0);
                        });

                    //weight on the path
                    // var text = svg.append("text")
                    //   .attr("x", 150)
                    //   .attr("dy", 15)
                    //   .attr('class', className)
                    //   .style("font-size", "14px");

                    // text.append("textPath")
                    //     .attr("xlink:href", '#'+pathId)
                    //     .text(parseFloat(arcLink.weight).toFixed(3));

                }
            } else {
                var path = d3.path();
                var xSource = _this.nameToNode[arcLink.source].y;
                var ySource = _this.nameToNode[arcLink.source].x;
                var xTarget = _this.nameToNode[arcLink.target].y;
                var yTarget = _this.nameToNode[arcLink.target].x;
                path.arc(xSource, (ySource + yTarget)/2, (Math.abs(yTarget - ySource))/2, -0.5 * Math.PI, 0.5 * Math.PI, false);

                var pathString = path.toString();

                var pathId = arcLink.source + arcLink.target;
                svg.append("path")
                    .attr("d", pathString)
                    .attr("id", pathId)
                    .attr('class', className)
                    .attr("fill", "none")
                    .on('mouseover', function (d) {
                        d3.select(this).attr('class', 'pathMouseover');
                        d3.selectAll('[id=\''+ arcLink.source + '\']').style('fill', 'red');
                        d3.selectAll('[id=\''+ arcLink.target + '\']').style('fill', 'red');
                        weightTooltip.transition()
                            .duration(200)
                            .style("opacity", .9);
                        var details = "";
                        arcLink.details.forEach(detail => {
                            details += detail[0] + "<>" + detail[1] + ";";
                        })
                        weightTooltip.html(typeLegend + "</br>" + arcLink.source + " => " + arcLink.target + "</br>" + "[" + details + "]")
                            .style("color", "red")
                            .style("left", (d3.event.pageX) + "px")
                            .style("top", (d3.event.pageY - 28) + "px");

                    })
                    .on('mouseout', function (d) {
                        d3.select(this).attr('class', className);
                        d3.selectAll('[id=\''+ arcLink.source + '\']').style("fill", function(d: any) {
                            // return d._children ? "lightsteelblue" : "#fff";
                            if (d.data.type === 3) {
                                var color = _this.myColor(d.id);
                                d.data.color = color;
                                return color;
                            } else if (d.parent !== null && d.parent.data.type === 3) {
                                return d.parent.data.color;
                            } else {
                                return '#fff';
                            }
                        })
                        d3.selectAll('[id=\''+ arcLink.target + '\']').style("fill", function(d: any) {
                            // return d._children ? "lightsteelblue" : "#fff";
                            if (d.data.type === 3) {
                                var color = _this.myColor(d.id);
                                d.data.color = color;
                                return color;
                            } else if (d.parent !== null && d.parent.data.type === 3) {
                                return d.parent.data.color;
                            } else {
                                return '#fff';
                            }
                        })
                        weightTooltip.transition()
                            .duration(500)
                            .style("opacity", 0);
                    });
            }

        });
    }

  private openTab(tabName) {
    let tabcontent;
    tabcontent = document.getElementsByClassName('tabcontent-document-analysis');
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
      //document.getElementById("button-" + tabcontent[i].id).style.color = '#43b9c7';
      document.getElementById("button-" + tabcontent[i].id).style.fontWeight = 'normal';
    }
    document.getElementById(tabName).style.display = 'block';
    //document.getElementById("button-" + tabName).style.color = 'red';
    document.getElementById("button-" + tabName).style.fontWeight = 'bold';

  }

  private onChangeToggle(event) {
      d3.select(".container-documents-analysis").selectAll("svg").remove();

      var margin = {top: 20, right: 90, bottom: 30, left: 90},
          width = 3000 - margin.left - margin.right,
          height = 1500 - margin.top - margin.bottom;
      var svg = d3.select(".container-documents-analysis").append("svg")
          .attr("width", width + margin.right + margin.left)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate("
              + margin.left + "," + margin.top + ")");

      this.displayDiagram(this.treeDataCopy, svg, this.argumentOverlapConnections,this.contentOverlapConnections,  this.topicOverlapConnections, this.semanticLsaConnections,
          this.corefConnections, this.sliderValueArgument, this.sliderValueContent, this.sliderValueTopic, this.sliderValueSemantic );

  }
}
