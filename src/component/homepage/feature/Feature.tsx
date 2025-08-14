import { useState } from 'react';
import { Container, Tab, Tabs } from "react-bootstrap";
import {  Feauture, FeautureThree, FeautureTwo } from '../../../assets/images';


function Feature() {
    const [key, setKey] = useState<string>('create');

    return (
        <div className='feuture'>
            <Container className='position-relative'>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k as string)}
                    className="mb-3"
                >
                    <Tab eventKey="create" title="We Create">
                        <div className='feauture-content '>
                            <div className='future-image'>
                                <img src={Feauture} alt='tabbing-image' />
                            </div>
                            <div className='future-info'>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="inspire" title="We Inspire">
                        <div className='feauture-content'>
                            <div className='future-image'>
                                <img src={FeautureTwo} alt='tabbing-image' />
                            </div>
                            <div className='future-info'>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="deliver" title="We Deliver">
                        <div className='feauture-content'>
                            <div className='future-image'>
                                <img src={FeautureThree} alt='tabbing-image' />
                            </div>
                            <div className='future-info'>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </Container>
        </div>

    );
}

export default Feature;
