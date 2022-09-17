import React, { useEffect } from 'react';
import './ItemPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCurrentUser } from '../../actions/list';
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from "chart.js";
import { setLabels, setMonthSort, setWeekSort, setYearSort } from '../../../reducers/chartReducer';
ChartJS.register(
    Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler
)


const ItemPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.list.user);
    const isFetching = useSelector(state => state.list.isFetching);
    const isFetchError = useSelector(state => state.list.isFetchError);
    const labels = useSelector(state => state.chart.labels);
    const week = useSelector(state => state.chart.weekSort);
    const month = useSelector(state => state.chart.monthSort);
    const year = useSelector(state => state.chart.yearSort);
    const params = useParams();
    const curencies = labels.map(el => el.curency === 'null' ? '0' : el.curency).sort((a, b) => Number(a) - Number(b));
    console.log(user);

    useEffect(()=>{
        dispatch(getCurrentUser(params.id))
    }, [])

    if(week === false && year === false && month === false) {
        setLabels(user)
    }

    function showChoosenChart(setActive, num) {
        dispatch(setWeekSort(false));
        dispatch(setMonthSort(false));
        dispatch(setYearSort(false));
        dispatch(setActive(true));
        if(isFetching === false) {
            let now = user[user.length - 1].date;
            let arr = [];
            let time = Date.parse(now);
            now = new Date(time - (time % 86400000));
            for (let i = 0; i < num; i++, now.setDate(now.getDate() - 1)) {
                arr.push(now.toISOString());
            }
            const lastEl = arr[arr.length - 1];
            const ind = user.findIndex( el => el.date.substr(0, 10) === lastEl.substr(0, 10));
            dispatch(setLabels([...user].slice(ind)));
        }
    }

    function showYearChart(setActive) {
        dispatch(setWeekSort(false));
        dispatch(setMonthSort(false));
        dispatch(setYearSort(false));
        dispatch(setActive(true));
        if(isFetching === false) {
            const firstDate = user.findIndex(el => el.date.substr(0, 10) === '2021-01-01');
            let lastDate = user.findIndex( el => el.date.substr(0, 10) === '2021-12-31');;
            dispatch(setLabels([...user].slice(firstDate, lastDate)));
        }
    }

    const data = {
        labels: labels.map(el => el.date.substr(0, 10)),
        datasets: [
          {
            label: "All",
            data: labels.map(el => el.curency === 'null' ? '0' : el.curency),
            fill: true,
            pointRadius: 1,
            tension: 0.3,
            backgroundColor: "rgba(0, 122, 255, 0.33)",
            borderColor: "rgba(0, 122, 255, 1)",
          },
        ],
    };
    const options = {
        maintainAspectRatio: false,
    };

    function arraySum(array){
        let sum = 0;
        for(var i = 0; i < array.length; i++){
            sum += ++array[i];
        }
        return(sum);
    }

    return (
        <div className='item'>
            <div className="item__container container">
                {isFetchError &&
                    <h2 className="alert alert-danger" role="alert">
                        Произошла ошибка! Пoжалуйста обновите страницу!
                    </h2>
                }
                <div className='item__border'>
                    <div className="item__row">
                        <h1 className="item__title">Revenue</h1>
                        <div className="item__buttons">
                            <div className="item__btn">
                                <button 
                                    onClick={()=> showChoosenChart(setWeekSort, 7)} 
                                    type='button'
                                    className={week ? 'active' : ''}
                                >
                                    Week
                                </button>
                            </div>
                            <div className="item__btn">
                                <button 
                                    onClick={()=> showChoosenChart(setMonthSort, 31)} 
                                    type='button'
                                    className={month ? 'active' : ''}
                                >
                                    Month
                                </button>
                            </div>
                            <div className="item__btn">
                                <button 
                                    onClick={()=> showYearChart(setYearSort)} 
                                    type='button'
                                    className={year ? 'active' : ''}
                                >
                                    Year
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="item__diagram">
                        {isFetching 
                        ? <div className='fetching'></div>
                        : <Line data={data} options={options} />
                        }
                        
                    </div>
                    {!isFetching && 
                        <div>
                            <div className="item__total">
                                <h3 className='item__total-title'>Total</h3>
                                <p className='item__total-text'>
                                    ${Math.round(arraySum([...curencies]))}
                                </p>
                            </div>
                            <div className="item__bottom bottom-item">
                                <div className="bottom-item__size">
                                    <h3 className="bottom-item__title">Min</h3>
                                    <p className='bottom-item__text'>
                                        ${curencies[0]}
                                    </p>
                                </div>
                                <div className="bottom-item__size">
                                    <h3 className="bottom-item__title">Medium</h3>
                                    <p className='bottom-item__text'>
                                        ${curencies[Math.ceil(curencies.length / 2)]}
                                    </p>
                                </div>
                                <div className="bottom-item__size">
                                    <h3 className="bottom-item__title">Max</h3>
                                    <p className='bottom-item__text'>
                                        ${curencies[curencies.length - 1]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default ItemPage;