L.Control.print = L.Control.extend({
    options: {
        position: 'topright',
    },

    onAdd: function (map) {
        var controlDiv = L.DomUtil.create('div', 'leaflet-control-print');
        L.DomEvent
            .addListener(controlDiv, 'click', L.DomEvent.stopPropagation)
            .addListener(controlDiv, 'click', L.DomEvent.preventDefault)
            .addListener(controlDiv, 'click', function () { window.print(); });


        var controlUI = L.DomUtil.create('div', 'leaflet-control-print-interior', controlDiv);
        controlUI.title = 'Print current map';
        return controlDiv;
    }
});

L.control.print = function (options) {
    return new L.Control.print(options);
};