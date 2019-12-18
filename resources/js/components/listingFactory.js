require('ion-rangeslider');
import isMobile from '../app.js';

function isFilterApplied(filter, filterItems) {
    return filter === 'price'
        ? Math.round(filterItems.from) !== Math.round(filterItems.min) ||
              Math.round(filterItems.to) !== Math.round(filterItems.max)
        : filterItems.filter(filterItem => filterItem.checked).length > 0;
}

export default function renderFilters(
    filterData,
    desktopFilterTemplate,
    $filterContainer,
    $priceRangeSlider
) {
    $filterContainer.empty();
    for (var filter in filterData) {
        const filterItems = filterData[filter];
        (filter === 'price' ||
            (filterItems.length &&
                filterItems.filter(item => item.enabled).length)) &&
            $filterContainer.append(
                desktopFilterTemplate({
                    name: filter,
                    list: filterItems,
                    isPrice: filter === 'price',
                    isApplied: isFilterApplied(filter, filterItems)
                })
            );
        const data = filterData[filter];
        $priceRangeSlider.ionRangeSlider({
            skin: 'sharp',
            type: 'double',
            min: data.min ? data.min : 0,
            max: data.max ? data.max : 10000,
            from: data.from ? data.from : data.min,
            to: data.to ? data.to : data.max,
            prefix: '$',
            prettify_separator: ',',
            onStart: function(data) {
                // fired then range slider is ready
            },
            onChange: function(data) {
                // fired on every range slider update
            },
            onFinish: function(data) {
                // fired on pointer release

                var $inp = $priceRangeSlider;
                price_from = $inp.data('from'); // reading input data-from attribute
                price_to = $inp.data('to'); // reading input data-to attribute
                iPageNo = 0;
                updateFilters();
                fetchProducts(true);
            },
            onUpdate: function(data) {
                // fired on changing slider with Update method
            }
        });
    }

    if (!isMobile()) {
        $filterContainer.append(
            '<a class="clearall-filter-btn" href="#" id="clearAllFiltersBtn">Clear All</a>'
        );
    }
}
