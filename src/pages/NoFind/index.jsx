import React, { Component } from 'react'
import './index.css'
import wand from '../../assets/images/wand.jpg'
import licht from '../../assets/images/licht.png'
import halo1 from '../../assets/images/halo1.png'
import halo2 from '../../assets/images/halo2.png'
import batma from '../../assets/images/batman-404.png'


export default class NoFind extends Component {
    goHome = () => {
        console.log(this.props.history.replace('/home'));
    }
    render() {
        return (
            <div>
                <div id="content" className="narrowcolumn" >
                    <div id="parallax" style={{ width: '100%' }} onClick={this.goHome}>
                        <div className="error1" >
                            <img src={wand} alt="Mauer" />
                        </div>
                        <div className="error2" >
                            <img src={licht} alt="Licht" />
                        </div>
                        <div className="error3" >
                            <img src={halo1} alt="Halo1" />
                        </div>
                        <div className="error4">
                            <img src={halo2} alt="Halo2" />
                        </div>
                        <div className="error5">
                            <img src={batma} alt="Batcave 404" />
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}