const paraPromise = (async () => {

const nodes = await fetch("")
    .then((response) => response.json())
    .then(json => {
        // Do something with the data
        console.log(json.nodes);
        return json.nodes;
    });

const links = await fetch("https://api.sheety.co/80b915ba243f78c0a893af7eee3fcde5/parallels/links")
    .then((response) => response.json())
    .then(json => {
        // Do something with the data
        console.log(json.links);
        return json.links;
    });


const parallels = {
    nodes: nodes,
    links: links
}
    return parallels

})

let nodes;
let links;

const node_request = new XMLHttpRequest();
node_request.open('GET', 'https://api.sheety.co/80b915ba243f78c0a893af7eee3fcde5/parallels/nodes', false);  // `false` makes the request synchronous
node_request.send(null);

if (node_request.status === 200) {
    nodes = JSON.parse(node_request.responseText)
}

const edge_request = new XMLHttpRequest();
edge_request.open('GET', 'https://api.sheety.co/80b915ba243f78c0a893af7eee3fcde5/parallels/links', false);  // `false` makes the request synchronous
edge_request.send(null);

if (edge_request.status === 200) {
    links = JSON.parse(edge_request.responseText);
}

console.log()

const parallels = {...nodes, ...links };
console.log(parallels)
function getGraphDataSets() {
    const loadMiserables = function(Graph) {
        const _les_mis = {
            "nodes": les_mis["nodes"].map((node, index) => {
                node["id"] = index;
                return node;
            }),
            "links": les_mis["links"]
        }

        Graph
          .nodeLabel('name')
          .nodeAutoColorBy('group')
          .graphData(parallels)
          .dagMode('td')
          .dagLevelDistance(20)
          .linkDirectionalArrowLength(0.1)
          .linkDirectionalArrowRelPos(1)
          .linkCurvature(0.1)
        Graph.onEngineStop(() => Graph.zoomToFit(400));
    };
    loadMiserables.description = "<em>Les Miserables</em> data (<a href='https://bl.ocks.org/mbostock/4062045'>4062045</a>)";

    //

    const loadBlocks = function(Graph) {
        Graph
          .nodeLabel(node => `${node.user?node.user+': ':''}${node.description || node.id}`)
          .nodeAutoColorBy('user')
          .jsonUrl('.blocks.json');
    };
    loadBlocks.description = "<em>Blocks</em> data (<a href='https://bl.ocks.org/mbostock/afecf1ce04644ad9036ca146d2084895'>afecf1ce04644ad9036ca146d2084895</a>)";

    //

    const loadD3Dependencies = function(Graph) {
        fetch('.d3.csv').then(r => r.text()).then(d3.csvParse).then(data => {
            const nodes = [], links = [];
            data.forEach(({ size, path }) => {
                const levels = path.split('/'),
                  module = levels.length > 1 ? levels[1] : null,
                  leaf = levels.pop(),
                  parent = levels.join('/');

                nodes.push({
                    path,
                    leaf,
                    module,
                    size: +size || 1
                });

                if (parent) {
                    links.push({ source: parent, target: path});
                }
            });

            Graph
                .nodeRelSize(0.5)
                .nodeId('path')
                .nodeVal('size')
                .nodeLabel('path')
                .nodeAutoColorBy('module')
                .graphData({ nodes, links });
        });
    };
    loadD3Dependencies.description = "<em>D3 dependencies</em> data (<a href='https://bl.ocks.org/mbostock/9a8124ccde3a4e9625bc413b48f14b30'>9a8124ccde3a4e9625bc413b48f14b30</a>)";

    //

    return [loadMiserables, loadBlocks, loadD3Dependencies];
}

const les_mis = {
  "nodes":  [
    { "name": "Myriel",             "group":  1 },
    { "name": "Napoleon",           "group":  1 },
    { "name": "Mlle.Baptistine",    "group":  1 },
    { "name": "Mme.Magloire",       "group":  1 },
    { "name": "CountessdeLo",       "group":  1 },
    { "name": "Geborand",           "group":  1 },
    { "name": "Champtercier",       "group":  1 },
    { "name": "Cravatte",           "group":  1 },
    { "name": "Count",              "group":  1 },
    { "name": "OldMan",             "group":  1 },
    { "name": "Labarre",            "group":  2 },
    { "name": "Valjean",            "group":  2 },
    { "name": "Marguerite",         "group":  3 },
    { "name": "Mme.deR",            "group":  2 },
    { "name": "Isabeau",            "group":  2 },
    { "name": "Gervais",            "group":  2 },
    { "name": "Tholomyes",          "group":  3 },
    { "name": "Listolier",          "group":  3 },
    { "name": "Fameuil",            "group":  3 },
    { "name": "Blacheville",        "group":  3 },
    { "name": "Favourite",          "group":  3 },
    { "name": "Dahlia",             "group":  3 },
    { "name": "Zephine",            "group":  3 },
    { "name": "Fantine",            "group":  3 },
    { "name": "Mme.Thenardier",     "group":  4 },
    { "name": "Thenardier",         "group":  4 },
    { "name": "Cosette",            "group":  5 },
    { "name": "Javert",             "group":  4 },
    { "name": "Fauchelevent",       "group":  0 },
    { "name": "Bamatabois",         "group":  2 },
    { "name": "Perpetue",           "group":  3 },
    { "name": "Simplice",           "group":  2 },
    { "name": "Scaufflaire",        "group":  2 },
    { "name": "Woman1",             "group":  2 },
    { "name": "Judge",              "group":  2 },
    { "name": "Champmathieu",       "group":  2 },
    { "name": "Brevet",             "group":  2 },
    { "name": "Chenildieu",         "group":  2 },
    { "name": "Cochepaille",        "group":  2 },
    { "name": "Pontmercy",          "group":  4 },
    { "name": "Boulatruelle",       "group":  6 },
    { "name": "Eponine",            "group":  4 },
    { "name": "Anzelma",            "group":  4 },
    { "name": "Woman2",             "group":  5 },
    { "name": "MotherInnocent",     "group":  0 },
    { "name": "Gribier",            "group":  0 },
    { "name": "Jondrette",          "group":  7 },
    { "name": "Mme.Burgon",         "group":  7 },
    { "name": "Gavroche",           "group":  8 },
    { "name": "Gillenormand",       "group":  5 },
    { "name": "Magnon",             "group":  5 },
    { "name": "Mlle.Gillenormand",  "group":  5 },
    { "name": "Mme.Pontmercy",      "group":  5 },
    { "name": "Mlle.Vaubois",       "group":  5 },
    { "name": "Lt.Gillenormand",    "group":  5 },
    { "name": "Marius",             "group":  8 },
    { "name": "BaronessT",          "group":  5 },
    { "name": "Mabeuf",             "group":  8 },
    { "name": "Enjolras",           "group":  8 },
    { "name": "Combeferre",         "group":  8 },
    { "name": "Prouvaire",          "group":  8 },
    { "name": "Feuilly",            "group":  8 },
    { "name": "Courfeyrac",         "group":  8 },
    { "name": "Bahorel",            "group":  8 },
    { "name": "Bossuet",            "group":  8 },
    { "name": "Joly",               "group":  8 },
    { "name": "Grantaire",          "group":  8 },
    { "name": "MotherPlutarch",     "group":  0 },
    { "name": "Gueulemer",          "group":  4 },
    { "name": "Babet",              "group":  4 },
    { "name": "Claquesous",         "group":  4 },
    { "name": "Montparnasse",       "group":  4 },
    { "name": "Toussaint",          "group":  5 },
    { "name": "Child1",             "group": 10 },
    { "name": "Child2",             "group": 10 },
    { "name": "Brujon",             "group":  4 },
    { "name": "Mme.Hucheloup",      "group":  8 }
  ],

  "links":  [
    { "source":  1,  "target":  0,  "value":  1 },
    { "source":  2,  "target":  0,  "value":  8 },
    { "source":  3,  "target":  0,  "value": 10 },
    { "source":  3,  "target":  2,  "value":  6 },
    { "source":  4,  "target":  0,  "value":  1 },
    { "source":  5,  "target":  0,  "value":  1 },
    { "source":  6,  "target":  0,  "value":  1 },
    { "source":  7,  "target":  0,  "value":  1 },
    { "source":  8,  "target":  0,  "value":  2 },
    { "source":  0,  "target":  0,  "value":  1 },
    { "source": 11,  "target": 10,  "value":  1 },
    { "source": 11,  "target":  3,  "value":  3 },
    { "source": 11,  "target":  2,  "value":  3 },
    { "source": 11,  "target":  0,  "value":  5 },
    { "source": 12,  "target": 11,  "value":  1 },
    { "source": 13,  "target": 11,  "value":  1 },
    { "source": 14,  "target": 11,  "value":  1 },
    { "source": 15,  "target": 11,  "value":  1 },
    { "source": 17,  "target": 16,  "value":  4 },
    { "source": 18,  "target": 16,  "value":  4 },
    { "source": 18,  "target": 17,  "value":  4 },
    { "source": 19,  "target": 16,  "value":  4 },
    { "source": 19,  "target": 17,  "value":  4 },
    { "source": 19,  "target": 18,  "value":  4 },
    { "source": 20,  "target": 16,  "value":  3 },
    { "source": 20,  "target": 17,  "value":  3 },
    { "source": 20,  "target": 18,  "value":  3 },
    { "source": 20,  "target": 19,  "value":  4 },
    { "source": 21,  "target": 16,  "value":  3 },
    { "source": 21,  "target": 17,  "value":  3 },
    { "source": 21,  "target": 18,  "value":  3 },
    { "source": 21,  "target": 19,  "value":  3 },
    { "source": 21,  "target": 20,  "value":  5 },
    { "source": 22,  "target": 16,  "value":  3 },
    { "source": 22,  "target": 17,  "value":  3 },
    { "source": 22,  "target": 18,  "value":  3 },
    { "source": 22,  "target": 19,  "value":  3 },
    { "source": 22,  "target": 20,  "value":  4 },
    { "source": 22,  "target": 21,  "value":  4 },
    { "source": 23,  "target": 16,  "value":  3 },
    { "source": 23,  "target": 17,  "value":  3 },
    { "source": 23,  "target": 18,  "value":  3 },
    { "source": 23,  "target": 19,  "value":  3 },
    { "source": 23,  "target": 20,  "value":  4 },
    { "source": 23,  "target": 21,  "value":  4 },
    { "source": 23,  "target": 22,  "value":  4 },
    { "source": 23,  "target": 12,  "value":  2 },
    { "source": 23,  "target": 11,  "value":  0 },
    { "source": 24,  "target": 23,  "value":  2 },
    { "source": 24,  "target": 11,  "value":  7 },
    { "source": 25,  "target": 24,  "value": 13 },
    { "source": 25,  "target": 23,  "value":  1 },
    { "source": 25,  "target": 11,  "value": 12 },
    { "source": 26,  "target": 24,  "value":  4 },
    { "source": 26,  "target": 11,  "value": 31 },
    { "source": 26,  "target": 16,  "value":  1 },
    { "source": 26,  "target": 25,  "value":  1 },
    { "source": 27,  "target": 11,  "value": 17 },
    { "source": 27,  "target": 23,  "value":  5 },
    { "source": 27,  "target": 25,  "value":  5 },
    { "source": 27,  "target": 24,  "value":  1 },
    { "source": 27,  "target": 26,  "value":  1 },
    { "source": 28,  "target": 11,  "value":  8 },
    { "source": 28,  "target": 27,  "value":  1 },
    { "source": 29,  "target": 23,  "value":  1 },
    { "source": 29,  "target": 27,  "value":  1 },
    { "source": 29,  "target": 11,  "value":  2 },
    { "source": 30,  "target": 23,  "value":  1 },
    { "source": 31,  "target": 30,  "value":  2 },
    { "source": 31,  "target": 11,  "value":  3 },
    { "source": 31,  "target": 23,  "value":  2 },
    { "source": 31,  "target": 27,  "value":  1 },
    { "source": 32,  "target": 11,  "value":  1 },
    { "source": 33,  "target": 11,  "value":  2 },
    { "source": 33,  "target": 27,  "value":  1 },
    { "source": 34,  "target": 11,  "value":  3 },
    { "source": 34,  "target": 29,  "value":  2 },
    { "source": 35,  "target": 11,  "value":  3 },
    { "source": 35,  "target": 34,  "value":  3 },
    { "source": 35,  "target": 29,  "value":  2 },
    { "source": 36,  "target": 34,  "value":  2 },
    { "source": 36,  "target": 35,  "value":  2 },
    { "source": 36,  "target": 11,  "value":  2 },
    { "source": 36,  "target": 29,  "value":  1 },
    { "source": 37,  "target": 34,  "value":  2 },
    { "source": 37,  "target": 35,  "value":  2 },
    { "source": 37,  "target": 36,  "value":  2 },
    { "source": 37,  "target": 11,  "value":  2 },
    { "source": 37,  "target": 29,  "value":  1 },
    { "source": 38,  "target": 34,  "value":  2 },
    { "source": 38,  "target": 35,  "value":  2 },
    { "source": 38,  "target": 36,  "value":  2 },
    { "source": 38,  "target": 37,  "value":  2 },
    { "source": 38,  "target": 11,  "value":  2 },
    { "source": 38,  "target": 29,  "value":  1 },
    { "source": 39,  "target": 25,  "value":  1 },
    { "source": 40,  "target": 25,  "value":  1 },
    { "source": 41,  "target": 24,  "value":  2 },
    { "source": 41,  "target": 25,  "value":  3 },
    { "source": 42,  "target": 41,  "value":  2 },
    { "source": 42,  "target": 25,  "value":  2 },
    { "source": 42,  "target": 24,  "value":  1 },
    { "source": 43,  "target": 11,  "value":  3 },
    { "source": 43,  "target": 26,  "value":  1 },
    { "source": 43,  "target": 27,  "value":  1 },
    { "source": 44,  "target": 28,  "value":  3 },
    { "source": 44,  "target": 11,  "value":  1 },
    { "source": 45,  "target": 28,  "value":  2 },
    { "source": 47,  "target": 46,  "value":  1 },
    { "source": 48,  "target": 47,  "value":  2 },
    { "source": 48,  "target": 25,  "value":  1 },
    { "source": 48,  "target": 27,  "value":  1 },
    { "source": 48,  "target": 11,  "value":  1 },
    { "source": 49,  "target": 26,  "value":  3 },
    { "source": 49,  "target": 11,  "value":  2 },
    { "source": 50,  "target": 49,  "value":  1 },
    { "source": 50,  "target": 24,  "value":  1 },
    { "source": 51,  "target": 49,  "value":  0 },
    { "source": 51,  "target": 26,  "value":  2 },
    { "source": 51,  "target": 11,  "value":  2 },
    { "source": 52,  "target": 51,  "value":  1 },
    { "source": 52,  "target": 39,  "value":  1 },
    { "source": 53,  "target": 51,  "value":  1 },
    { "source": 54,  "target": 51,  "value":  2 },
    { "source": 54,  "target": 49,  "value":  1 },
    { "source": 54,  "target": 26,  "value":  1 },
    { "source": 55,  "target": 51,  "value":  6 },
    { "source": 55,  "target": 49,  "value": 12 },
    { "source": 55,  "target": 39,  "value":  1 },
    { "source": 55,  "target": 54,  "value":  1 },
    { "source": 55,  "target": 26,  "value": 21 },
    { "source": 55,  "target": 11,  "value": 19 },
    { "source": 55,  "target": 16,  "value":  1 },
    { "source": 55,  "target": 25,  "value":  2 },
    { "source": 55,  "target": 41,  "value":  5 },
    { "source": 55,  "target": 48,  "value":  4 },
    { "source": 56,  "target": 49,  "value":  1 },
    { "source": 56,  "target": 55,  "value":  1 },
    { "source": 57,  "target": 55,  "value":  1 },
    { "source": 57,  "target": 41,  "value":  1 },
    { "source": 57,  "target": 48,  "value":  1 },
    { "source": 58,  "target": 55,  "value":  7 },
    { "source": 58,  "target": 48,  "value":  7 },
    { "source": 58,  "target": 27,  "value":  6 },
    { "source": 58,  "target": 57,  "value":  1 },
    { "source": 58,  "target": 11,  "value":  4 },
    { "source": 59,  "target": 58,  "value": 15 },
    { "source": 59,  "target": 55,  "value":  5 },
    { "source": 59,  "target": 48,  "value":  6 },
    { "source": 59,  "target": 57,  "value":  2 },
    { "source": 60,  "target": 48,  "value":  1 },
    { "source": 60,  "target": 58,  "value":  4 },
    { "source": 60,  "target": 59,  "value":  2 },
    { "source": 61,  "target": 48,  "value":  2 },
    { "source": 61,  "target": 58,  "value":  6 },
    { "source": 61,  "target": 60,  "value":  2 },
    { "source": 61,  "target": 59,  "value":  5 },
    { "source": 61,  "target": 57,  "value":  1 },
    { "source": 61,  "target": 55,  "value":  1 },
    { "source": 62,  "target": 55,  "value":  0 },
    { "source": 62,  "target": 58,  "value": 17 },
    { "source": 62,  "target": 59,  "value": 13 },
    { "source": 62,  "target": 48,  "value":  7 },
    { "source": 62,  "target": 57,  "value":  2 },
    { "source": 62,  "target": 41,  "value":  1 },
    { "source": 62,  "target": 61,  "value":  6 },
    { "source": 62,  "target": 60,  "value":  3 },
    { "source": 63,  "target": 59,  "value":  5 },
    { "source": 63,  "target": 48,  "value":  5 },
    { "source": 63,  "target": 62,  "value":  6 },
    { "source": 63,  "target": 57,  "value":  2 },
    { "source": 63,  "target": 58,  "value":  4 },
    { "source": 63,  "target": 61,  "value":  3 },
    { "source": 63,  "target": 60,  "value":  2 },
    { "source": 63,  "target": 55,  "value":  1 },
    { "source": 64,  "target": 55,  "value":  5 },
    { "source": 64,  "target": 62,  "value": 12 },
    { "source": 64,  "target": 48,  "value":  5 },
    { "source": 64,  "target": 63,  "value":  4 },
    { "source": 64,  "target": 58,  "value": 10 },
    { "source": 64,  "target": 61,  "value":  6 },
    { "source": 64,  "target": 60,  "value":  2 },
    { "source": 64,  "target": 59,  "value":  0 },
    { "source": 64,  "target": 57,  "value":  1 },
    { "source": 64,  "target": 11,  "value":  1 },
    { "source": 65,  "target": 63,  "value":  5 },
    { "source": 65,  "target": 64,  "value":  7 },
    { "source": 65,  "target": 48,  "value":  3 },
    { "source": 65,  "target": 62,  "value":  5 },
    { "source": 65,  "target": 58,  "value":  5 },
    { "source": 65,  "target": 61,  "value":  5 },
    { "source": 65,  "target": 60,  "value":  2 },
    { "source": 65,  "target": 59,  "value":  5 },
    { "source": 65,  "target": 57,  "value":  1 },
    { "source": 65,  "target": 55,  "value":  2 },
    { "source": 66,  "target": 64,  "value":  3 },
    { "source": 66,  "target": 58,  "value":  3 },
    { "source": 66,  "target": 59,  "value":  1 },
    { "source": 66,  "target": 62,  "value":  2 },
    { "source": 66,  "target": 65,  "value":  2 },
    { "source": 66,  "target": 48,  "value":  1 },
    { "source": 66,  "target": 63,  "value":  1 },
    { "source": 66,  "target": 61,  "value":  1 },
    { "source": 66,  "target": 60,  "value":  1 },
    { "source": 67,  "target": 57,  "value":  3 },
    { "source": 68,  "target": 25,  "value":  5 },
    { "source": 68,  "target": 11,  "value":  1 },
    { "source": 68,  "target": 24,  "value":  1 },
    { "source": 68,  "target": 27,  "value":  1 },
    { "source": 68,  "target": 48,  "value":  1 },
    { "source": 68,  "target": 41,  "value":  1 },
    { "source": 69,  "target": 25,  "value":  6 },
    { "source": 69,  "target": 68,  "value":  6 },
    { "source": 69,  "target": 11,  "value":  1 },
    { "source": 69,  "target": 24,  "value":  1 },
    { "source": 69,  "target": 27,  "value":  2 },
    { "source": 69,  "target": 48,  "value":  1 },
    { "source": 69,  "target": 41,  "value":  1 },
    { "source": 70,  "target": 25,  "value":  4 },
    { "source": 70,  "target": 69,  "value":  4 },
    { "source": 70,  "target": 68,  "value":  4 },
    { "source": 70,  "target": 11,  "value":  1 },
    { "source": 70,  "target": 24,  "value":  1 },
    { "source": 70,  "target": 27,  "value":  1 },
    { "source": 70,  "target": 41,  "value":  1 },
    { "source": 70,  "target": 58,  "value":  1 },
    { "source": 71,  "target": 27,  "value":  1 },
    { "source": 71,  "target": 69,  "value":  2 },
    { "source": 71,  "target": 68,  "value":  2 },
    { "source": 71,  "target": 70,  "value":  2 },
    { "source": 71,  "target": 11,  "value":  1 },
    { "source": 71,  "target": 48,  "value":  1 },
    { "source": 71,  "target": 41,  "value":  1 },
    { "source": 71,  "target": 25,  "value":  1 },
    { "source": 72,  "target": 26,  "value":  2 },
    { "source": 72,  "target": 27,  "value":  1 },
    { "source": 72,  "target": 11,  "value":  1 },
    { "source": 73,  "target": 48,  "value":  2 },
    { "source": 74,  "target": 48,  "value":  2 },
    { "source": 74,  "target": 73,  "value":  3 },
    { "source": 75,  "target": 69,  "value":  3 },
    { "source": 75,  "target": 68,  "value":  3 },
    { "source": 75,  "target": 25,  "value":  3 },
    { "source": 75,  "target": 48,  "value":  1 },
    { "source": 75,  "target": 41,  "value":  1 },
    { "source": 75,  "target": 70,  "value":  1 },
    { "source": 75,  "target": 71,  "value":  1 },
    { "source": 76,  "target": 64,  "value":  1 },
    { "source": 76,  "target": 65,  "value":  1 },
    { "source": 76,  "target": 66,  "value":  1 },
    { "source": 76,  "target": 63,  "value":  1 },
    { "source": 76,  "target": 62,  "value":  1 },
    { "source": 76,  "target": 48,  "value":  1 },
    { "source": 76,  "target": 58,  "value":  1 }
  ]
}
