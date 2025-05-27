import React, {Component} from 'react';
import './Pie.css';
import Slice from './Slices/Slices';
import Questions from './Questions/Questions';

export default class Pie extends Component{
    state = {
        slices: {
            
            1: {
                question: 'Saving',
                rotate: 'rotate(120.0000, 220, 220)',
                fill: '#39CEF3',
                transform: '1'
            },
            2: {
                question: 'Liquidy',
                rotate: 'rotate(50.0000, 220, 220)',
                fill: '#0CBBB8',
                transform: '1'
            },
            3: {
                question: 'EmergencyFund',
                rotate: 'rotate(340.0000, 220, 220)',
                fill: '#037E95',
                transform: '1'
            },
            4: {
                question: 'Coverage',
                rotate: 'rotate(268.0000, 220, 220)',
                fill: '#2E87B9',
                transform: '1'
            },
            5: {
              question: 'Investment',
              rotate: 'rotate(195.0000, 220, 220)',
              fill: '#006699',
              transform: '1'
            },
            
           
        }
    }
    // selectScore = question => e => {
    //     const targetValue = e.target.value === '10' ? '1' : '0.' + e.target.value
    //     const newState = Object.assign({}, this.state);
    //     newState.slices[question].transform = targetValue;
    //     this.setState(newState);
    // }


    componentDidMount() {
        console.log(Math.min((this.props.data.Co) / 20 + 0.1, 5))
            this.setState(prevState => ({
                slices: {
                    ...prevState.slices,
                    1: {
                        ...prevState.slices[1],
                        transform: Math.min((this.props.data.Sa) / 20 + 0.15, 1)
                    },
                    2: {
                        ...prevState.slices[2],
                        transform: Math.min((this.props.data.L) / 10 + 0.15, 1)
                    },
                    3: {
                        ...prevState.slices[3],
                        transform: Math.min((this.props.data.E) / 20 + 0.15, 1)
                    },
                    4: {
                        ...prevState.slices[4],
                        transform: Math.min((this.props.data.Co) / 20 + 0.15, 1)
                    },
                    5: {
                        ...prevState.slices[5],
                        transform: Math.min((this.props.data.In) / 30 + 0.15, 1)
                    },
                }
            }));
        }
    
    render(){
        
        // this.setState(Math.min((this.props.data.L)/10+0.1,1))}
        // {this.state.slices[3].transform=this.setState(Math.min((this.props.data.Co)/20+0.1,1))}
        // {this.state.slices[4].transform=this.setState(Math.min((this.props.data.E)/20+0.1,1))}
        // {this.state.slices[5].transform=this.setState(Math.min((this.props.data.In)/30+0.1,1))}
        return (
                <div className="ChartBlock">
                    <div className="ChartPie flex items-center justify-center">
                        <svg className="ChartPieChunk" viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <g id="overlay">
                                <rect x="219" y="30" height="200" width="2" fill="#FFF"></rect>
                                <g transform="translate(210, 10)">
                                    <path fill="#000"></path>
                                </g>
                            </g>
                        </defs>
                        <mask id="wedge-mask" fill="white">
                            <path transform="translate(20, 20)" d="M100 2.241a100.006 1000.006 0 01250.551-.865L200.004 200 90.33 10.241z" 
                            fillRule="nonzero"></path>
                        </mask>
                        <circle cx="220" cy="220" r="250"  stroke="#E3E3E3" strokeWidth="2" style={{opacity:"0"}}></circle>
                            <Slice
                                slices={this.state.slices}
                            />
                            <circle cx="220" cy="220" r="30" fill='#E7F9F2' stroke="#E7F9F2" strokeWidth="0" style={{opacity:"1"}}>
                            </circle>
                            {/* <use xlinkHref="#overlay" transform="rotate(19, 220, 220)"></use>
                            <use xlinkHref="#overlay" transform="rotate(63.7143, 220, 220)"></use>
                            <use xlinkHref="#overlay" transform="rotate(108.7143, 220, 220)"></use> */}
                            {/* <use xlinkHref="#overlay" transform="rotate(153.7143, 220, 220)"></use>
                            <use xlinkHref="#overlay" transform="rotate(198.7143, 220, 220)"></use>
                            <use xlinkHref="#overlay" transform="rotate(243.7143, 220, 220)"></use>
                            <use xlinkHref="#overlay" transform="rotate(288.7143, 220, 220)"></use>
                            <use xlinkHref="#overlay" transform="rotate(333.7143, 220, 220)"></use> */}
                        </svg>
                        {(this.props?.data.total) <10?<h3 className="midNumber-10" >{this.props.data.total}</h3>:<h3 className="midNumber" >{this.props.data.total}</h3>}
                    </div>
                </div>
        );
    }
}