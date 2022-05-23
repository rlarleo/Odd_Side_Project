import React, { Fragment } from 'react';
import Head from 'next/head';
import Sticky from 'react-stickynode';
import { ThemeProvider } from 'styled-components';
import { agencyTheme } from 'common/theme/agency';
import ResetCSS from 'common/assets/css/style';
import { GlobalStyle, AgencyWrapper } from 'containers/Agency/agency.style';
import Navbar from 'containers/Agency/Navbar';
import BannerSection from 'containers/Agency/BannerSection';
import AboutUsSection from 'containers/Agency/AboutUsSection';
import SlideSection from 'containers/Agency/SlideSection';
import ButtonSection from 'containers/Agency/ButtonSection';
import TeamSection from 'containers/Agency/TeamSection';
import VideoSection from 'containers/Agency/VideoSection';
import Footer from 'containers/Agency/Footer';
import { DrawerProvider } from 'common/contexts/DrawerContext';
import FaqSection from 'containers/Agency/FaqSection';

const Main = () => {
  return (
        <ThemeProvider theme={agencyTheme}>
          <Fragment>
            {/* Start agency head section */}
            <Head>
              <title>ODD Project</title>
              <meta name="theme-color" content="#10ac84" />
              <meta name="Description" content="React next landing page" />
              {/* Load google fonts */}
              <link
                href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i"
                rel="stylesheet"
              />
            </Head>
            <ResetCSS />
            <GlobalStyle />
            <AgencyWrapper>
              <Sticky top={0} innerZ={888} activeClass="sticky-nav-active">
                <DrawerProvider>
                  <Navbar />
                </DrawerProvider>
              </Sticky>
              <BannerSection />
              <AboutUsSection />
              <SlideSection />
              <ButtonSection />
              <VideoSection />
              <TeamSection />
              <FaqSection />
              <Footer />
            </AgencyWrapper>
          </Fragment>
        </ThemeProvider>
  );
};
export default Main;
