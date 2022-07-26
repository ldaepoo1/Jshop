(function () {
    var c = window.AmCharts;
    c.AmGanttChart = c.Class({
        inherits: c.AmSerialChart,
        construct: function (a) {
            this.type = "gantt";
            c.AmGanttChart.base.construct.call(this, a);
            this.cname = "AmGanttChart";
            this.period = "ss"
        },
        initChart: function () {
            this.dataChanged && this.processGanttData();
            c.AmGanttChart.base.initChart.call(this)
        },
        parseData: function () {
            c.AmSerialChart.base.parseData.call(this);
            this.parseSerialData(this.ganttDataProvider)
        },
        processGanttData: function () {
            var a;
            this.graphs = [];
            var v = this.dataProvider;
            this.ganttDataProvider = [];
            var z = this.categoryField,
                C = this.startField,
                D = this.endField,
                E = this.durationField,
                F = this.startDateField,
                G = this.endDateField,
                w = this.colorField,
                p = c.extractPeriod(this.period),
                f = p.period,
                p = p.count,
                q = c.getDate(this.startDate, this.dataDateFormat, "fff");
            this.categoryAxis.gridPosition = "start";
            a = this.valueAxis;
            this.valueAxes = [a];
            var A;
            "date" == a.type && (A = !0);
            a.minimumDate && (a.minimumDate = c.getDate(a.minimumDate, u, f));
            a.maximumDate && (a.maximumDate = c.getDate(a.maximumDate, u, f));
            isNaN(a.minimum) || (a.minimumDate =
                c.changeDate(new Date(q), f, a.minimum, !0, !0));
            isNaN(a.maximum) || (a.maximumDate = c.changeDate(new Date(q), f, a.maximum, !0, !0));
            var u = this.dataDateFormat;
            if (v)
                for (a = 0; a < v.length; a++) {
                    var e = v[a],
                        l = {};
                    l[z] = e[z];
                    var x = e[this.segmentsField],
                        m;
                    this.ganttDataProvider.push(l);
                    e = e[w];
                    this.colors[a] || (this.colors[a] = c.randomColor());
                    if (x)
                        for (var g = 0; g < x.length; g++) {
                            var d = x[g],
                                b = d[C],
                                h = d[D],
                                n = d[E];
                            isNaN(b) && (b = m);
                            isNaN(n) || (h = b + n);
                            var n = "start_" + a + "_" + g,
                                y = "end_" + a + "_" + g;
                            l[n] = b;
                            l[y] = h;
                            var r = "lineColor color alpha fillColors description bullet customBullet bulletSize bulletConfig url labelColor dashLength pattern gap className".split(" "),
                                k, t;
                            for (t in r) k = r[t] + "Field", (m = this.graph[k]) && void 0 !== d[m] && (l[m + "_" + a + "_" + g] = d[m]);
                            m = h;
                            if (A) {
                                k = c.getDate(d[F], u, f);
                                var B = c.getDate(d[G], u, f);
                                q && (isNaN(b) || (k = c.changeDate(new Date(q), f, b * p, !0, !0)), isNaN(h) || (B = c.changeDate(new Date(q), f, h * p, !0, !0)));
                                l[n] = k.getTime();
                                l[y] = B.getTime()
                            }
                            h = {};
                            c.copyProperties(d, h);
                            b = {};
                            c.copyProperties(this.graph, b, !0);
                            for (t in r) k = r[t] + "Field", this.graph[k] && (b[k] = r[t] + "_" + a + "_" + g);
                            b.customData = h;
                            b.segmentData = d;
                            b.labelFunction = this.graph.labelFunction;
                            b.balloonFunction =
                                this.graph.balloonFunction;
                            b.customBullet = this.graph.customBullet;
                            b.type = "column";
                            b.openField = n;
                            b.valueField = y;
                            b.clustered = !1;
                            d[w] && (e = d[w]);
                            b.columnWidth = d[this.columnWidthField];
                            void 0 === e && (e = this.colors[a]);
                            (d = this.brightnessStep) && (e = c.adjustLuminosity(e, g * d / 100));
                            void 0 === this.graph.lineColor && (b.lineColor = e);
                            void 0 === this.graph.fillColors && (b.fillColors = e);
                            this.graphs.push(b)
                        }
                }
        }
    })
})();