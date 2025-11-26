// pages/Search/Search.jsx
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import SearchSection from "../../components/SearchSection/SearchSection.jsx";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useHistogramSearchMutation, useObjectSearchMutation } from '../../services/objectSearchService.js';
import SearchResultSection from "../../components/SearchResultSection/SearchResultSection.jsx";
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const [requestHistogram] = useHistogramSearchMutation();
    const [requestObject] = useObjectSearchMutation();
    const { isAuthenticated, token } = useAuth();
    const [isSearching, setIsSearching] = useState(false);
    const [histogramResponse, setHistogramResponse] = useState([]);
    const [objectSearchResponse, setObjectSearchResponse] = useState([]);
    const [openResults, setOpenResults] = useState(false);


    const decodeToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64).split('').map((c) => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join('')
            );
            return JSON.parse(jsonPayload);
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            return null;
        }
    };

    const sendForm = async (formData) => {
        // Проверка 1: Токен существует?
        if (!token) {
            console.error('❌ Токен не найден! Нужно залогиниться');
            navigate('/login');
            return;
        }

        // Проверка 2: Токен не пустой?
        if (token.trim() === '') {
            console.error('❌ Токен пустой!');
            return;
        }

        // Проверка 3: Это JWT?
        if (!token.includes('.')) {
            console.error('❌ Это не JWT токен!');
            return;
        }

        const decoded = decodeToken(token);
        if (!decoded) {
            console.error('❌ Не удалось декодировать токен!');
            return;
        }

        console.log('✅ Токен валиден:', decoded);

        const obj = {
            issueDateInterval: {
                startDate: formData.startDate,
                endDate: formData.endDate
            },
            searchContext: {
                targetSearchEntitiesContext: {
                    targetSearchEntities: [
                        {
                            type: "company",
                            sparkId: null,
                            entityId: null,
                            inn: formData.inn,
                            maxFullness: formData.optionalFactors.fullness,
                            inBusinessNews: formData.optionalFactors.businessContext
                        }
                    ],
                    onlyMainRole: formData.optionalFactors.mainRole,
                    tonality: formData.tone,
                    onlyWithRiskFactors: formData.optionalFactors.riskFactors,
                    riskFactors: {
                        and: [],
                        or: [],
                        not: []
                    },
                    themes: {
                        and: [],
                        or: [],
                        not: []
                    }
                },
                themesFilter: {
                    and: [],
                    or: [],
                    not: []
                }
            },
            searchArea: {
                includedSources: [],
                excludedSources: [],
                includedSourceGroups: [],
                excludedSourceGroups: []
            },
            attributeFilters: {
                excludeTechNews: !formData.optionalFactors.technicalNews,
                excludeAnnouncements: !formData.optionalFactors.announcements,
                excludeDigests: !formData.optionalFactors.newsDigests
            },
            similarMode: "duplicates",
            limit: Number(formData.documentsCount),
            sortType: "sourceInfluence",
            sortDirectionType: "desc",
            intervalType: "month",
            histogramTypes: [
                "totalDocuments",
                "riskFactors"
            ]
        };

        if (token) {
            console.log('🔍 Отправляю запрос с данными:', JSON.stringify(obj, null, 2));
            console.log('🔑 Token:', token.substring(0, 20) + '...');
            setOpenResults(true);
            setIsSearching(true);
            try {
                const [histogramResult, objectResult] = await Promise.all([
                    requestHistogram({ data: obj, token }).unwrap(),
                    requestObject({ data: obj, token }).unwrap()
                ]);

                console.log('✅ Гистограмма успешно получена:', histogramResult);
                console.log('✅ Результаты поиска успешно получены:', objectResult);

                setHistogramResponse(histogramResult.data || histogramResult);
                setObjectSearchResponse(objectResult.items || objectResult);
                setIsSearching(false);
            } catch (err) {
                setIsSearching(false);
                console.error('❌ Полная ошибка:', err);

                if (err.data) {
                    console.error('❌ Ошибка от сервера:', JSON.stringify(err.data, null, 2));
                }
                if (err.status) {
                    console.error('❌ HTTP статус:', err.status);
                }
            }
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && !localStorage.getItem('token') && !token) {
            navigate('/login');
        }
    }, [isAuthenticated, token, navigate]);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '100vh'
        }}>
            <Header />
            {!openResults && <SearchSection sendForm={sendForm} />}
            {openResults && <SearchResultSection
                isSearching={isSearching}
                histogramResponse={histogramResponse}
                objectSearchResponse={objectSearchResponse}
            />}
            <Footer />
        </div>
    );
};

export default SearchPage;
