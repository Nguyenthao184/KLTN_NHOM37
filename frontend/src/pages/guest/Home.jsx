import CampaignList from "../../components/CampaignList/index.jsx";
import Header from "../../components/Header/index.jsx";
import Footer from "../../components/Footer/index.jsx";
import OrganizationList from "../../components/OrganizationList/index.jsx";
import MeNu from "../../components/Menu/index.jsx";

export default function GuestHomePage() {
  return (
    <>
      <Header />
      <MeNu />
      <CampaignList fullBleed maxWidth="100%" title={null} />
      <OrganizationList fullBleed maxWidth="100%" title={null} />
      <Footer />

    </>
  );
}
