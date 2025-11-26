// pages/Main/Main.jsx
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import TariffSection from "../../components/TarifSection/TariffSection.jsx";
import PicSection from "../../components/PicSection/PicSection.jsx";
import AboutUsSection from "../../components/AboutUsSection/AboutUsSection.jsx";
import TitleSection from "../../components/TitleSection/TitleSection.jsx";

const Main = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}>
            <Header />
            <TitleSection />
            <AboutUsSection />
            <PicSection />
            <TariffSection />
            <Footer />
        </div>
    );
};

export default Main;
