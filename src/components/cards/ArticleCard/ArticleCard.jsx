// ArticleCard.jsx
import { extractImageFromContent } from "./extractImage";
import Button from "../../Button/Button";
import { parseXmlText, countWordsAccurate } from "./helperFunction";
import "./index.css";

const ArticleCard = ({ data }) => {
    const handleClick = () => {
        window.open(data.url, '_blank');
    };

    const cardDate = new Date(data.issueDate);
    const day = String(cardDate.getDate()).padStart(2, '0');
    const month = String(cardDate.getMonth() + 1).padStart(2, '0');
    const year = cardDate.getFullYear();
    const dateString = `${day}.${month}.${year}`;

    // ✅ Извлекаем картинку (или null)
    const imageUrl = extractImageFromContent(data.content?.markup);
    const title = data.title?.text || 'Без заголовка';

    const renderTag = (label) => (
        <div style={{
            display: "inline-block",
            padding: "4px 8px",
            backgroundColor: "#FFB64F",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "500",
            marginBottom: "16px",
            marginRight: "8px"
        }}>
            {label}
        </div>
    );

    const content = data.content?.markup || '';
    const parsedContent = parseXmlText(content);
    const wordCount = countWordsAccurate(parsedContent);

    return (
        <div className="articleCard" style={{
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
            border: "1px solid #eaeaea",
            color: "#333",
            overflow: "hidden"
        }}>
            {/* Содержимое карточки */}
            <div style={{ padding: "16px" }}>
                {/* Дата и источник */}
                <div style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    gap: '10px',
                    alignItems: "center",
                    marginBottom: "16px",
                    fontSize: "12px",
                    color: "#949494",
                }}>
                    <p style={{ color: '#949494', margin: 0 }}>{dateString}</p>
                    <p style={{ margin: 0 }}>
                        <a
                            href={data.url || ''}
                            style={{
                                textDecoration: data.url ? 'underline' : 'none',
                                color: '#949494',
                                cursor: data.url ? "pointer" : "unset"
                            }}
                        >
                            {data.source?.name || 'Источник'}
                        </a>
                    </p>
                </div>

                {/* Заголовок */}
                <h2 style={{
                    margin: "0 0 12px 0",
                    fontSize: "18px",
                    lineHeight: "1.3",
                    color: "#222"
                }}>
                    {title}
                </h2>

                {/* Теги */}
                <div style={{ marginBottom: "12px" }}>
                    {data.attributes?.isTechNews && renderTag('Технические новости')}
                    {!data.attributes?.isTechNews && renderTag('Другие новости')}
                    {data.attributes?.isAnnouncement && renderTag('Анонс')}
                    {data.attributes?.isDigest && renderTag('Дайджест')}
                </div>

                {/* ✅ Картинка ТОЛЬКО если она есть */}
                {imageUrl && (
                    <div style={{
                        width: "100%",
                        height: "200px",
                        backgroundColor: "#f5f5f5",
                        overflow: "hidden",
                        marginBottom: "16px",
                        borderRadius: "8px"
                    }}>
                        <img
                            src={imageUrl}
                            alt={title}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block"
                            }}
                            onError={(e) => {
                                // ✅ Если картинка не загрузилась — скрываем контейнер
                                e.target.parentElement.style.display = 'none';
                            }}
                        />
                    </div>
                )}

                {/* Содержимое */}
                <div style={{
                    marginBottom: "16px",
                    lineHeight: "1.6",
                    fontSize: "14px",
                    color: "#555",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                }}>
                    {parsedContent}
                </div>

                {/* Кнопка и количество слов */}
                <div style={{
                    display: "flex",
                    justifyContent: data.url ? "space-between" : "flex-end",
                    alignItems: "center",
                    fontSize: "12px",
                    color: "#999",
                    paddingTop: "12px",
                    borderTop: "1px solid #f0f0f0",
                    gap: '10px',
                }}>
                    {data.url && (
                        <Button
                            onClickFunc={handleClick}
                            btnText="Читать в источнике"
                            bg='#7CE3E1'
                            textColor='black'
                            maxWidth={180}
                        />
                    )}
                    <span style={{ whiteSpace: "nowrap" }}>
                        {wordCount} слов(-a)
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ArticleCard;
