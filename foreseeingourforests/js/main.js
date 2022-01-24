document.addEventListener('DOMContentLoaded', function () {

    /* NAVIGATION BAR */
    /* Nav Selected States  */
    const nav1 = document.querySelector('#nav-1');
    const nav2 = document.querySelector('#nav-2');
    const nav3 = document.querySelector('#nav-3');
    const nav4 = document.querySelector('#nav-4');
    const nav5 = document.querySelector('#nav-5');

    ScrollTrigger.create({
        trigger: ".intro",
        start: "top 10%",
        end: "bottom 80%",
        onEnter: self => {
            nav1.classList.add('selected');
        },
        onEnterBack: self => {
            nav1.classList.add('selected');
            nav2.classList.remove('selected');
        }
    })

    ScrollTrigger.create({
        trigger: ".forests",
        start: "top 10%",
        end: "bottom 80%",
        onEnter: self => {
            nav1.classList.remove('selected');
            nav2.classList.add('selected');
        },
        onEnterBack: self => {
            nav2.classList.add('selected');
            nav3.classList.remove('selected');
        }
    })

    ScrollTrigger.create({
        trigger: ".history",
        start: "top 10%",
        end: "bottom 80%",
        onEnter: self => {
            nav2.classList.remove('selected');
            nav3.classList.add('selected');
        },
        onEnterBack: self => {
            nav3.classList.add('selected');
            nav4.classList.remove('selected');
        }
    })

    ScrollTrigger.create({
        trigger: ".future",
        start: "top 10%",
        end: "bottom 80%",
        onEnter: self => {
            nav3.classList.remove('selected');
            nav4.classList.add('selected');
        },
        onEnterBack: self => {
            nav4.classList.add('selected');
            nav5.classList.remove('selected');
        }
    })

    ScrollTrigger.create({
        trigger: ".outro",
        start: "top 10%",
        end: "bottom 80%",
        onEnter: self => {
            nav4.classList.remove('selected');
            nav5.classList.add('selected');
        },
        onEnterBack: self => {
            nav5.classList.add('selected');
        }
    })

    /* FOREST GRAPH */
    // Data from StatsNZ https://www.stats.govt.nz/information-releases/environmental-economic-accounts-2019-data-to-2017
    window.addEventListener('load', forestGraph);
    async function forestGraph() {
        const dataVol = await getForestData();
        let ctx = document.getElementById('forest-graph').getContext('2d');
        Chart.defaults.font.family = "Omnes";
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dataVol.years,
                datasets: [{
                        label: 'Natural forest - soil',
                        data: [],
                        borderColor: '#ffa600',
                        backgroundColor: '#ffa600',
                        borderWidth: 1,
                    },
                    {
                        label: 'Cultivated timber - soil',
                        data: [],
                        borderColor: '#b7a300',
                        backgroundColor: '#b7a300',
                        borderWidth: 1,
                    },
                    {
                        label: 'Natural forest - biomass',
                        data: [],
                        borderColor: '#74970e',
                        backgroundColor: '#74970e',
                        borderWidth: 1,
                    },
                    {
                        label: 'Cultivated timber - biomass',
                        data: [],
                        borderColor: '#328630',
                        backgroundColor: '#328630',
                        borderWidth: 1,
                    },

                ],
            },
            options: {
                // responsive: false,
                layout: {
                    padding: 20
                },
                plugins: {
                    title: {
                        display: true,
                        text: (ctx) => 'New Zealand Forests Carbon Stocks',
                        font: {
                            size: 24,
                            weight: 600,
                        }
                    },
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false,
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Carbon Sequestered (kt C)'
                        },
                        // stacked: true,
                    }
                },
            }
        });

        async function getForestData() {
            const response = await fetch('forest.csv');
            const data = await response.text();
            const years = [];
            const cultivatedBiomass = [];
            const cultivatedSoil = [];
            const naturalBiomass = [];
            const naturalSoil = [];

            const rows = data.split('\n').slice(1);
            rows.forEach(row => {
                const columns = row.split(',');
                years.push(columns[0]);
                cultivatedBiomass.push(columns[1]);
                cultivatedSoil.push(columns[2]);
                naturalBiomass.push(columns[3]);
                naturalSoil.push(columns[4]);
            })
            return {
                years,
                cultivatedBiomass,
                cultivatedSoil,
                naturalBiomass,
                naturalSoil
            };
        }

        ScrollTrigger.create({
            trigger: "#natural-soil",
            start: "top 10%",
            end: "bottom 80%",
            onEnter: self => {
                naturalSoil()
            },
            onEnterBack: self => {
                naturalSoil()
            }
        })

        ScrollTrigger.create({
            trigger: "#cultivated-soil",
            start: "top 10%",
            end: "bottom 80%",
            onEnter: self => {
                cultivatedSoil()
            },
            onEnterBack: self => {
                cultivatedSoil()
            }
        })

        ScrollTrigger.create({
            trigger: "#natural-biomass",
            start: "top 10%",
            end: "bottom 80%",
            onEnter: self => {
                naturalBiomass()
            },
            onEnterBack: self => {
                naturalBiomass()
            }
        })

        ScrollTrigger.create({
            trigger: "#cultivated-biomass",
            start: "top 10%",
            end: "bottom 80%",
            onEnter: self => {
                cultivatedBiomass()
            },
            onEnterBack: self => {
                cultivatedBiomass()
            }
        })

        function naturalSoil() {
            myChart.data.datasets[0].data = dataVol.naturalSoil;
            myChart.data.datasets[1].data = [];
            myChart.data.datasets[2].data = [];
            myChart.data.datasets[3].data = [];
            myChart.update();
        }

        function cultivatedSoil() {
            myChart.data.datasets[0].data = [];
            myChart.data.datasets[1].data = dataVol.cultivatedSoil;
            myChart.data.datasets[2].data = [];
            myChart.data.datasets[3].data = [];
            myChart.update();
        }

        function naturalBiomass() {
            myChart.data.datasets[0].data = [];
            myChart.data.datasets[1].data = [];
            myChart.data.datasets[2].data = dataVol.naturalBiomass;
            myChart.data.datasets[3].data = [];
            myChart.update();
        }

        function cultivatedBiomass() {
            myChart.data.datasets[0].data = [];
            myChart.data.datasets[1].data = [];
            myChart.data.datasets[2].data = [];
            myChart.data.datasets[3].data = dataVol.cultivatedBiomass;
            myChart.update();
        }
    }


    /* HISTORY MAP */
    // Data from GEONETNZ
    gsap.utils.toArray(".comparison").forEach(section => {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "center center",
                // Matches height to width while pinning
                end: () => "+=" + section.offsetWidth,
                scrub: true,
                pin: true,
                anticipatePin: 1
            },
            defaults: {
                ease: "none"
            }
        });
        // Animate one way
        tl
            .fromTo(section.querySelector(".map-2"), {
                xPercent: 100,
                x: 0
            }, {
                xPercent: 0
            })
            // Animate the opposite way for map 2
            .fromTo(section.querySelector(".map-2 img"), {
                xPercent: -100,
                x: 0
            }, {
                xPercent: 0
            }, 0)
            .fromTo(".explain-1", {
                opacity: 0
            }, {
                opacity: 1,
                duration: 0.25
            }, 0)

            .fromTo(section.querySelector(".map-3"), {
                xPercent: 100,
                x: 0
            }, {
                xPercent: 0
            }, 1)
            .fromTo(".explain-1", {
                opacity: 1
            }, {
                opacity: 0,
                duration: 0.25
            }, 0.75)
            .fromTo(".explain-2", {
                opacity: 0
            }, {
                opacity: 1,
                duration: 0.25
            }, 1)
            // Animate the opposite way for map 3
            .fromTo(section.querySelector(".map-3 img"), {
                xPercent: -100,
                x: 0
            }, {
                xPercent: 0
            }, 1)

            .fromTo(section.querySelector(".map-4"), {
                xPercent: 100,
                x: 0
            }, {
                xPercent: 0
            }, 2)
            .fromTo(".explain-2", {
                opacity: 1
            }, {
                opacity: 0,
                duration: 0.25
            }, 1.75)
            .fromTo(".explain-3", {
                opacity: 0
            }, {
                opacity: 1,
                duration: 0.25
            }, 2)

            .fromTo(section.querySelector(".map-4 img"), {
                xPercent: -100,
                x: 0
            }, {
                xPercent: 0
            }, 2)

            .fromTo(section.querySelector(".map-5"), {
                xPercent: 100,
                x: 0
            }, {
                xPercent: 0
            }, 3)
            .fromTo(".explain-3", {
                opacity: 1
            }, {
                opacity: 0,
                duration: 0.25
            }, 3)
            .fromTo(section.querySelector(".map-5 img"), {
                xPercent: -100,
                x: 0
            }, {
                xPercent: 0
            }, 3)
    })

    /*     const explain1 = document.querySelector(".explain-1");
        const explain2 = document.querySelector(".explain-2");
        const explain3 = document.querySelector(".explain-3");
     */

    /* HISTORY GRAPH */
    // Data from Ministry for the Environment ‘New Zealand’s Greenhouse Gas Inventory 1990-2013’
    window.addEventListener('load', historyGraph);
    async function historyGraph() {
        const dataVol = await getData();
        let ctx = document.getElementById('history-graph').getContext('2d');
        Chart.defaults.font.family = "Omnes";
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dataVol.years,
                datasets: [{
                        label: 'Afforestation',
                        data: dataVol.afforestation,
                        borderColor: '#328630',
                        backgroundColor: '#328630',
                        // fill: true,
                        borderWidth: 1,
                    },
                    {
                        label: 'Deforestation',
                        data: dataVol.deforestation,
                        borderColor: '#AB3131',
                        backgroundColor: '#AB3131',
                        // fill: true,
                        borderWidth: 1,
                    }

                ],
            },
            options: {
                maintainAspectRatio: true,
                responsive: true,
                layout: {
                    padding: 20
                },
                plugins: {
                    title: {
                        display: true,
                        text: (ctx) => 'Forest cover since 1990',
                        font: {
                            size: 24,
                            weight: 600,
                        }
                    },
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false,
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Hectares'
                        },
                    }
                },
            }
        });
        async function getData() {
            const response = await fetch('history.csv');
            const data = await response.text();
            const years = [];
            const afforestation = [];
            const deforestation = [];

            const rows = data.split('\n').slice(1);
            rows.forEach(row => {
                const columns = row.split(',');
                years.push(columns[0]);
                afforestation.push(columns[1]);
                deforestation.push(columns[2]);;
            })
            return {
                years,
                afforestation,
                deforestation
            };
        }

        ScrollTrigger.create({
            trigger: "#recent",
            start: "top 10%",
            end: "bottom 80%",
            onEnter: self => {
                recentHistory()
            },
            onEnterBack: self => {
                recentHistory()
            }
        })

        ScrollTrigger.create({
            trigger: "#afforestation",
            start: "top 10%",
            end: "bottom 80%",
            onEnter: self => {
                affGraph()
            },
            onEnterBack: self => {
                affGraph()
            }
        })

        ScrollTrigger.create({
            trigger: "#deforestation",
            start: "top 10%",
            end: "bottom 80%",
            onEnter: self => {
                defGraph()
            },
            onEnterBack: self => {
                defGraph()
            }
        })

        function recentHistory() {
            myChart.data.datasets[0].data = dataVol.afforestation;
            myChart.data.datasets[1].data = dataVol.deforestation;
            myChart.update();
        }

        function affGraph() {
            myChart.data.datasets[0].data = dataVol.afforestation;
            myChart.data.datasets[1].data = [];
            myChart.update();
        }

        function defGraph() {
            myChart.data.datasets[0].data = [];
            myChart.data.datasets[1].data = dataVol.deforestation;
            myChart.update();
        }
    }


    /* FUTURE GRAPHS */
    // Data from One Billion Trees Programme https://www.mpi.govt.nz/forestry/funding-tree-planting-research/one-billion-trees-programme/
    window.addEventListener('load', graph1);
    window.addEventListener('load', graph2);
    window.addEventListener('load', graph3);

    /* Graph 1 */
    async function graph1() {
        Chart.defaults.font.family = "Omnes";
        let ctx = document.getElementById('graph-1').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: [
                    'Mixed Native',
                    'Reverted Native',
                    'Mānuka/kānuka',
                    'Pinus Radiata',
                    'Other Exotic'
                ],
                datasets: [{
                    label: 'Trees Planted',
                    data: [5525080, 1139783, 5831882, 9583325, 3990667],
                    backgroundColor: [
                        '#1e851c',
                        '#70a964',
                        '#b1cda9',
                        '#9aab2d',
                        '#bac272'
                    ],
                    borderWidth: 1,
                }],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                layout: {
                    padding: 20
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false,
                }
            }
        });
    }

    /* Graph 2 */
    async function graph2() {
        const dataVol = await getChart2Data();
        let ctx = document.getElementById('graph-2').getContext('2d');
        Chart.defaults.font.family = "Omnes";
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dataVol.region,
                datasets: [{
                        label: 'Native',
                        data: dataVol.native,
                        borderColor: '#1e851c',
                        backgroundColor: '#1e851c',
                        borderWidth: 1,
                    },
                    {
                        label: 'Exotic',
                        data: dataVol.exotic,
                        borderColor: '#9aab2d',
                        backgroundColor: '#9aab2d',
                        borderWidth: 1,
                    }

                ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                layout: {
                    padding: 20
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false,
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Region'
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Trees funded'
                        },
                        // stacked: true,
                    }
                },
                tooltips: {
                    titleFont: {
                        weight: 200,
                    }
                },
            }
        });
    }

    async function getChart2Data() {
        const response = await fetch('region.csv');
        const data = await response.text();
        const region = [];
        const native = [];
        const exotic = [];

        const rows = data.split('\n').slice(1);
        rows.forEach(row => {
            const columns = row.split(',');
            region.push(columns[0]);
            native.push(columns[1]);
            exotic.push(columns[2]);
        })
        return {
            region,
            native,
            exotic
        };
    }

    /* Graph 3 */
    async function graph3() {
        const dataVol = await getChart3Data();
        let ctx = document.getElementById('graph-3').getContext('2d');
        Chart.defaults.font.family = "Omnes";
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dataVol.years,
                datasets: [{
                    label: 'Carbon sequestered',
                    data: dataVol.carbon,
                    borderColor: '#1e851c',
                    backgroundColor: '#1e851c',
                    borderWidth: 1,
                }, ],
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                layout: {
                    padding: 20
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false,
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Years since planted'
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Carbon sequestered (tonnes)'
                        },
                    }
                },
            }
        });
    }
    async function getChart3Data() {
        const response = await fetch('carbon.csv');
        const data = await response.text();
        const years = [];
        const carbon = [];
        const rows = data.split('\n').slice(1);
        rows.forEach(row => {
            const columns = row.split(',');
            years.push(columns[0]);
            carbon.push(columns[1]);
        })
        return {
            years,
            carbon,
        };
    }

    const resourceButton = document.querySelector('#resources');
    const closeButton = document.querySelector('#close');
    let resources = document.querySelector('.resources');

    resourceButton.addEventListener('click', showResource);
    closeButton.addEventListener('click', hideResource)
    // resources.addEventListener('click', hideResource)

    function showResource() {
        resources.classList.add('show');
    }

    function hideResource() {
        resources.classList.remove('show');
    }

})