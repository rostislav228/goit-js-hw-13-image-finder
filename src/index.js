import "./css/main.css";
import NewsApiService from "./js/apiService"
import card from "./templates/card.hbs"
import LoadMoreBtn from "./js/loadMore"
import errorMessage from "./js/errorMessage"

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery')
}


const loadButton = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
})

refs.form.addEventListener('input', onSearch)
loadButton.refs.button.addEventListener('click', fetchArticles)

const newsApiService  = new NewsApiService() 
let galleryHeight = 0

async function onSearch(e) {
    try {
        refs.gallery.innerHTML = ''
    
        if (!e.target.value.trim()) {
            loadButton.hide()
            return
        }
        newsApiService .resetPage()
        newsApiService .query = e.target.value
        addMarkupContainer()
        loadButton.show()
    } catch (error) {
        errorMessage('Упс, что-то пошло не так', 3000)
    }
}

async function fetchArticles() {
    try {
        loadButton.disable()
        newsApiService .incrementPage()
        addMarkupContainer()
        galleryHeight = refs.gallery.offsetHeight
        loadButton.enable()
        setTimeout(() => {
            scrollingPage(galleryHeight)
        }, 500);
    } catch (error) {
        errorMessage('Упс, что-то пошло не так', 1000)
    }
}

function scrollingPage(height, scroll = 'smooth') {
    window.scrollTo({
        top: height,
        left: 0,
        behavior: scroll,
    });
}

function addMarkupContainer() {
    newsApiService .fetchArticles()
        .then(data => {
            const cardList =card(data)
            foundMarkup(cardList)
        }
    )
}

function foundMarkup(array, point = 'beforeend') {
    refs.gallery.insertAdjacentHTML(point, array)
}

