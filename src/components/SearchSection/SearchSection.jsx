// components/SearchSection/SearchSection.jsx
import SearchForm from "../SearchForm/SearchForm";
import "./index.css";

const SearchSection = ({ sendForm }) => {
    return (
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
            marginBottom: '64px',
            marginTop: '69px',
        }}>
            <div
                style={{
                    width: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyItems: 'center',
                }}
            >
                <div className="searchTitle" style={{
                    display: 'flex',
                    height: '214px',
                    width: '100%',
                    marginBottom: '47px'
                }}>
                    <div
                        className="searchTitle_textBlock"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <h1 className="searchTitle_textBlock_h1" style={{ fontWeight: '900', textTransform: 'uppercase' }}>
                            Найдите необходимые данные в пару кликов.
                        </h1>
                        <p className="searchTitle_textBlock_p">
                            Задайте параметры поиска. <br />
                            Чем больше заполните, тем точнее поиск
                        </p>
                    </div>
                    <div
                        className="searchTitle_imgBlock"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                    >
                        <img src="/icons/Document.svg" alt="document" style={{ width: '91px', height: 'auto' }} />
                        <img className="searchTitle_folderImg" src="/icons/Folders.svg" alt="folders" style={{ width: '140px', height: 'auto' }} />
                    </div>
                </div>

                <div className="searchArea" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="searchArea_searchForm">
                        <SearchForm sendForm={sendForm} />
                    </div>
                    <img src="/icons/SearchPic.svg" className="searchArea_img" alt="search pic" />
                </div>
            </div>
        </div>
    );
};

export default SearchSection;
