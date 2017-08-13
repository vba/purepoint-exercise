class SearchUI {

    static makeThrottle() {
        let delay = 0;
        return (cb, ms) => {
            clearTimeout(delay);
            delay = setTimeout(cb, ms);
        };
    }

    constructor () {
        this.throttleDelay = 1000;
        this.noImageUrl = 'http://www.freeiconspng.com/uploads/no-image-icon-15.png';
        this.url = 'http://localhost:1337/recipe';
        this.throttle = (SearchUI.makeThrottle)();
    }

    init () {
        $('#searchButton').click(this.search.bind(this));
        $('#recipeFindForm').submit(this.search.bind(this));
        $('#searchField').keyup(() => {
            this.throttle(this.search.bind(this), this.throttleDelay);
        });
    }

    search () {
        const query = $('#searchField').val();
        $.get(this.url, {q: query}).done((x) => this.displaySearchResults(x))
    }

    displaySearchResults (data) {
        const list = data.map((x, i) => {
            return `
                <a href="${x.href}" target="_blank" 
                   class="${i % 2 === 0 ? 'odd-list-row' : ''} list-group-item list-group-item-action flex-column align-items-start">
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">${x.title}</h5>
                        <small>
                            <img class="recipe-pic" 
                                 src="${x.thumbnail === '' ? this.noImageUrl : x.thumbnail}"
                                 alt="No image">
                        </small>
                    </div>
                    <small><b>Ingredients:</b> ${x.ingredients}</small>
                </a>
            `;
        }).reduce((acc, x) => [acc, x].join(''), '');
        $('#searchResult').html(list);
    }
}

new SearchUI().init();