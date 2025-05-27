import React, { forwardRef } from 'react'
import { TilePopover } from './tile-popover'
import { goals } from './goals'
import { cn } from '@/utils';

const COLOR_SIDE = {
    'completed': '#179899',
    'active': '#FF7300',
    'incompleted': '#748484',
    'new': '#01C8A9'
}

type CardType = 'card' | 'target' | 'money' | 'house' | 'investment' | 'add';

const COLOR_TOP = {
    'completed': '#DAE8EC',
    'active': '#DAE8EC',
}

export type COLOR_SIDE = 'completed' | 'active' | 'incompleted' | 'new'
export const Tile: React.FC<{
    type: COLOR_SIDE,
    className?: string,
    style?: React.CSSProperties,
    evenOdd: "even" | "odd"
    index: number;
    onClick?: React.MouseEventHandler<HTMLDivElement>,
    setActiveTile: React.Dispatch<React.SetStateAction<number | null>>
    setDefaultActive: React.Dispatch<React.SetStateAction<number | null>>
    children?: React.ReactNode
    cardType: CardType
    showAcitveTilePopover: boolean
    activeTile: number | null
    md: boolean
}> = ({ type, className, onClick, evenOdd, index, setActiveTile, setDefaultActive, children, cardType, showAcitveTilePopover, activeTile, md }) => {
    return (
        <div 
            onClick={onClick}
            className={`${type === "active" ? '' : ''} ${className}`} 
            style={{
                transform: `translate(${evenOdd === "odd" ? (md ? '340px' : '170px') : (md ? '120px' : '20px')}, ${((md ? 268 : 134) * ((index - 1) / 2)) + 20}px)`,
            }}
        >
            <div className="relative">
                <svg width="173" height="134" viewBox="0 0 173 134" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g filter="url(#filter0_df_3554_1509)">
                        <rect width="86.4545" height="86.4545" transform="matrix(0.87217 0.489203 -0.87217 0.489203 86.5801 19.8711)" fill={COLOR_SIDE[type]}/>
                        <path d="M11.2773 62.2031V81.1063L86.5643 123.656V104.424L11.2773 62.2031Z" fill="#7BADAE"/>
                        <path d="M161.852 62.2031V81.1063L86.5646 123.656V104.424L161.852 62.2031Z" fill="#7BADAE"/>
                    </g>
                    <g filter="url(#filter1_d_3554_1509)">
                        <rect width="86.4545" height="86.4545" transform="matrix(0.87217 0.489203 -0.87217 0.489203 86.7188 0.746094)" fill="#DAE8EC"/>
                        <path d="M11.4141 43.0781V61.9813L86.701 104.531V85.2992L11.4141 43.0781Z" fill={COLOR_SIDE[type]}/>
                        <path d="M161.99 43.0781V61.9813L86.7033 104.531V85.2992L161.99 43.0781Z" fill={COLOR_SIDE[type]}/>
                    </g>
                    <defs>
                        <filter id="filter0_df_3554_1509" x="0.876758" y="9.57109" width="171.407" height="124.385" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3554_1509"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3554_1509" result="shape"/>
                            <feGaussianBlur stdDeviation="5.15" result="effect2_foregroundBlur_3554_1509"/>
                        </filter>
                        <filter id="filter1_d_3554_1509" x="7.31543" y="0.746094" width="158.807" height="111.785" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="4"/>
                            <feGaussianBlur stdDeviation="2"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3554_1509"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3554_1509" result="shape"/>
                        </filter>
                    </defs>
                </svg>
                    {activeTile !== null && showAcitveTilePopover && activeTile === index - 1 && (
                        <div className={cn("absolute top-[108px]", evenOdd === "odd"?  "right-1/2" : "left-1/2")}>
                            <TilePopover evenOrOdd={evenOdd} setActiveTile={setActiveTile} setDefaultActive={setDefaultActive} />
                        </div>
                    )}
                {cardType === "card" ? (

                <div className="absolute top-[-12px] left-[3rem]">
                    <svg width="92" height="82" viewBox="0 0 92 82" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M91.6556 59.2069L57.0043 78.074L5.33984 47.6474L32.5644 27.2617L91.6556 59.2069Z" fill="#179899"/>
<rect x="0.524532" y="0.884161" width="61.8429" height="46.9409" rx="5.42086" transform="matrix(0.870713 0.491791 0.0142372 0.999899 5.97124 -0.168027)" fill="#179899" stroke="#055A8A" stroke-width="1.18545"/>
<path d="M8.14152 2.40625C6.18317 3.44033 2.21683 5.54685 2.01855 5.7008L9.62369 7.67704L8.14152 2.40625Z" fill="#179899"/>
<path d="M59.7007 76.7016L54.6487 79.4133L54.3193 72.4821L59.7007 71.2656L59.7007 74.8851L59.7007 76.7016Z" fill="#179899"/>
<path d="M59.7903 74.7849L60.2632 76.5241L57.465 75.9562L59.7903 74.7849Z" fill="#065B8A"/>
<path d="M57.5412 75.9014L58.0354 77.6609L55.1765 77.0807L57.5412 75.9014Z" fill="#065B8A"/>
<path d="M57.6164 75.8651L57.2488 78.0002L60.4031 76.2988L57.6164 75.8651Z" fill="#065B8A"/>
<path d="M55.3244 77.0916L54.9568 79.2268L58.1111 77.5254L55.3244 77.0916Z" fill="#065B8A"/>
<path d="M8.25384 2.31334L8.74228 3.87081L5.50155 3.63932L8.25384 2.31334Z" fill="#065B8A"/>
<path d="M5.59421 3.58186L6.10675 5.15587L2.79578 4.91936L5.59421 3.58186Z" fill="#065B8A"/>
<path d="M5.6849 3.53208L5.17954 5.54347L8.91708 3.64085L5.6849 3.53208Z" fill="#065B8A"/>
<path d="M2.97006 4.90708L2.4647 6.91847L6.20224 5.01585L2.97006 4.90708Z" fill="#065B8A"/>
<rect x="0.179938" y="0.303306" width="62.6217" height="47.7197" rx="5.81025" transform="matrix(0.870713 0.491791 0.0142372 0.999899 0.906641 2.6967)" fill="#F8FBFC" stroke="#065B8A" stroke-width="0.406661"/>
<rect x="0.129185" y="0.295019" width="22.7502" height="3.54154" rx="1.77077" transform="matrix(0.876963 0.480558 -0.241616 0.970372 31.7053 36.8138)" fill="#179899" stroke="#065B8A" stroke-width="0.406661"/>
<rect x="0.129185" y="0.295019" width="22.7502" height="3.54154" rx="1.77077" transform="matrix(0.876963 0.480558 -0.241616 0.970372 30.7551 43.5521)" fill="#179899" stroke="#065B8A" stroke-width="0.406661"/>
<path d="M25.3096 29.9557C26.9846 33.3404 27.5074 36.887 27.0077 39.8806C26.508 42.8745 24.9904 45.2989 22.5976 46.483C20.2048 47.6671 17.3568 47.4032 14.6735 45.9845C11.9904 44.5659 9.48775 41.999 7.81276 38.6143C6.13776 35.2296 5.61498 31.6829 6.11463 28.6893C6.61434 25.6954 8.13193 23.2711 10.5247 22.087C12.9175 20.9028 15.7655 21.1668 18.4489 22.5855C21.1319 24.004 23.6346 26.5709 25.3096 29.9557Z" fill="#179899" stroke="#065B8A" stroke-width="0.406661"/>
<path d="M18.293 28.1304C18.6388 28.8291 18.7435 29.5555 18.6426 30.1605C18.5415 30.7658 18.2393 31.2334 17.7841 31.4586C17.3288 31.6839 16.7738 31.6406 16.2312 31.3537C15.689 31.0671 15.1751 30.5432 14.8293 29.8445C14.4835 29.1458 14.3788 28.4195 14.4798 27.8145C14.5808 27.2091 14.883 26.7415 15.3382 26.5163C15.7935 26.291 16.3485 26.3343 16.8911 26.6212C17.4333 26.9079 17.9472 27.4317 18.293 28.1304Z" fill="white" stroke="#065B8A" stroke-width="0.406661"/>
<mask id="path-18-inside-1_3554_1616" fill="white">
<path d="M12.3083 36.6731C12.5534 34.8878 13.1517 33.3657 13.9717 32.4416C14.7917 31.5175 15.7662 31.2671 16.6808 31.7454C17.5954 32.2238 18.3752 33.3917 18.8486 34.9924C19.322 36.593 19.4503 38.4951 19.2053 40.2804L15.7568 38.4768L12.3083 36.6731Z"/>
</mask>
<path d="M12.3083 36.6731C12.5534 34.8878 13.1517 33.3657 13.9717 32.4416C14.7917 31.5175 15.7662 31.2671 16.6808 31.7454C17.5954 32.2238 18.3752 33.3917 18.8486 34.9924C19.322 36.593 19.4503 38.4951 19.2053 40.2804L15.7568 38.4768L12.3083 36.6731Z" fill="white" stroke="#065B8A" stroke-width="0.813322" mask="url(#path-18-inside-1_3554_1616)"/>
</svg>
                </div>
                ) : cardType === "target" ? (
                    <div className='absolute top-[-1rem] left-[2rem]'>
                        <svg width="109" height="96" viewBox="0 0 109 96" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_3554_1522)">
<ellipse cx="66.2591" cy="64.1094" rx="23.1459" ry="12.2959" transform="rotate(-4.6131 66.2591 64.1094)" fill="#179899"/>
<path d="M36.5351 20.4444L36.5236 20.4524L36.5116 20.4597C31.3058 23.6476 29.3912 28.6516 29.8847 34.7228C30.3809 40.826 33.3155 47.9723 37.7947 55.2865C42.2623 62.5819 47.7856 68.3678 53.4926 71.511C59.187 74.6472 65.0213 75.1371 70.2286 71.9483L70.2472 71.9369L70.2667 71.9271C77.7658 68.1909 81.3022 61.9834 81.8783 54.8942C82.4567 47.7782 80.0495 39.7521 75.5908 32.4711C66.6856 17.9293 49.7796 11.2733 36.5351 20.4444Z" fill="white" stroke="#055A8A"/>
<path d="M36.3615 20.6473C31.129 23.8516 28.1219 29.6572 27.5397 36.5203C26.9575 43.3831 28.8079 51.2665 33.255 58.5284C37.7021 65.7903 43.883 71.0217 50.2605 73.6225C56.6383 76.2234 63.1764 76.1837 68.4089 72.9794C73.6413 69.7752 76.6485 63.9695 77.2307 57.1064C77.8128 50.2436 75.9624 42.3602 71.5154 35.0983C67.0683 27.8364 60.8874 22.605 54.5099 20.0042C48.1321 17.4033 41.594 17.443 36.3615 20.6473Z" fill="#179899" stroke="#055A8A"/>
<path d="M40.37 27.1994C36.4666 29.5897 34.2142 33.926 33.7777 39.0713C33.3412 44.2164 34.7284 50.1337 38.0687 55.5883C41.409 61.0429 46.0493 64.9681 50.8305 66.9179C55.612 68.8678 60.4983 68.8325 64.4016 66.4421C68.305 64.0518 70.5575 59.7155 70.9939 54.5702C71.4304 49.4251 70.0432 43.5078 66.7029 38.0532C63.3626 32.5986 58.7224 28.6734 53.9411 26.7236C49.1596 24.7737 44.2734 24.809 40.37 27.1994Z" fill="white" stroke="#055A8A"/>
<path d="M43.7412 32.7053C40.9566 34.4105 39.3394 37.5099 39.0256 41.2093C38.7118 44.9084 39.709 49.1707 42.1177 53.104C44.5264 57.0374 47.8697 59.8629 51.3073 61.2648C54.7451 62.6667 58.2408 62.635 61.0254 60.9298C63.81 59.2246 65.4272 56.1252 65.741 52.4258C66.0548 48.7267 65.0576 44.4644 62.6489 40.5311C60.2402 36.5977 56.8969 33.7722 53.4593 32.3703C50.0215 30.9684 46.5258 31.0001 43.7412 32.7053Z" fill="#179899" stroke="#055A8A"/>
<path d="M46.3428 36.9525C44.4204 38.1297 43.2928 40.2759 43.0735 42.8609C42.8542 45.4457 43.5509 48.4326 45.2417 51.1935C46.9324 53.9544 49.2762 55.9326 51.6782 56.9122C54.0805 57.8918 56.5047 57.8629 58.427 56.6857C60.3494 55.5085 61.477 53.3623 61.6963 50.7773C61.9156 48.1925 61.2189 45.2056 59.5282 42.4447C57.8374 39.6838 55.4936 37.7056 53.0916 36.726C50.6893 35.7464 48.2651 35.7753 46.3428 36.9525Z" fill="white" stroke="#055A8A"/>
<path d="M23.6363 54.8418L27.72 57.2012L26.7982 61.3611L21.6902 63.6241L22.6633 59.2324L17.5779 58.1054L23.6363 54.8418Z" fill="#179899" stroke="#004183"/>
<path d="M22.5957 59.3398L52.3936 46.8218" stroke="#004183" stroke-width="2" stroke-linecap="round"/>
</g>
<defs>
<filter id="filter0_d_3554_1522" x="0.957226" y="0.53828" width="107.594" height="95.1695" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="2" dy="2"/>
<feGaussianBlur stdDeviation="8.6"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0901961 0 0 0 0 0.596078 0 0 0 0 0.6 0 0 0 0.27 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3554_1522"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3554_1522" result="shape"/>
</filter>
</defs>
</svg>

                    </div>
                ) : cardType === "investment" ? (
                    <div className='absolute top-[-70%] left-[-5px]'>
                        <svg width="185" height="216" viewBox="0 0 185 216" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M110.424 110.546L140.959 128.563L80.0158 163.66L51.1892 147.608L110.424 110.546Z" fill="#FF7300"/>
<g filter="url(#filter0_dd_3554_1657)">
<rect x="1.10798" width="22.3315" height="22.3315" transform="matrix(0.877421 -0.479721 0.877421 0.479721 75.126 69.012)" fill="white" stroke="#794E2B" stroke-width="1.26277"/>
<rect width="23.5942" height="23.5942" transform="matrix(0.877421 -0.479721 0.877421 0.479721 75.001 123.602)" fill="#D9D9D9"/>
<path d="M94.9844 133.847L75.6226 123.229V69.5373L95.0725 80.1688L94.9844 133.847Z" fill="#FF7300" stroke="#794E2B" stroke-width="1.26277"/>
<path d="M96.2621 133.848L115.762 123.228V69.5373L96.3113 80.1693L96.2621 133.848Z" fill="white" stroke="#794E2B" stroke-width="1.26277"/>
<rect x="1.10798" width="15.6686" height="15.6686" transform="matrix(0.877421 -0.479721 0.877421 0.479721 62.2696 98.1096)" fill="white" stroke="#794E2B" stroke-width="1.26277"/>
<rect width="16.9313" height="16.9313" transform="matrix(0.877421 -0.479721 0.877421 0.479721 62.1465 137.129)" fill="#D9D9D9"/>
<path d="M76.3042 144.186L62.7661 136.762V98.6389L76.3668 106.073L76.3042 144.186Z" fill="#FF7300" stroke="#794E2B" stroke-width="1.26277"/>
<path d="M77.5788 144.188L91.2153 136.761V98.6389L77.6137 106.074L77.5788 144.188Z" fill="#FF7300" stroke="#794E2B" stroke-width="1.26277"/>
<rect x="1.10798" width="10.8981" height="10.8981" transform="matrix(0.877421 -0.479721 0.877421 0.479721 51.3165 119.782)" fill="white" stroke="#794E2B" stroke-width="1.26277"/>
<rect width="12.1609" height="12.1609" transform="matrix(0.877421 -0.479721 0.877421 0.479721 51.1963 147.66)" fill="#D9D9D9"/>
<path d="M61.1804 152.433L51.812 147.295V120.319L61.2247 125.464L61.1804 152.433Z" fill="white" stroke="#794E2B" stroke-width="1.26277"/>
<path d="M62.4528 152.434L71.8911 147.294V120.319L62.4775 125.464L62.4528 152.434Z" fill="#FF7300" stroke="#794E2B" stroke-width="1.26277"/>
</g>
<defs>
<filter id="filter0_dd_3554_1657" x="0.669923" y="0.335573" width="183.925" height="215.04" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="2.52554" dy="2.52554"/>
<feGaussianBlur stdDeviation="10.8598"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0901961 0 0 0 0 0.596078 0 0 0 0 0.6 0 0 0 0.22 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3554_1657"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="8.83938" dy="2.52554"/>
<feGaussianBlur stdDeviation="29.6751"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0901961 0 0 0 0 0.596078 0 0 0 0 0.6 0 0 0 0.4 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_3554_1657" result="effect2_dropShadow_3554_1657"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_3554_1657" result="shape"/>
</filter>
</defs>
</svg>

                    </div>
                ) : cardType === "money" ? (
                    <div className='absolute top-[-15%] left-[13%]'>
                        <svg width="142" height="127" viewBox="0 0 142 127" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_dd_3554_1549)">
<path d="M23.7171 53.4291C22.9175 52.8542 22.9683 52.0019 23.8309 51.5213L40.7983 42.068C41.6646 41.5854 43.022 41.6598 43.8302 42.2343L85.2749 71.694C86.0535 72.2474 86.0424 73.0679 85.2496 73.5611L68.8491 83.763C67.9922 84.2961 66.565 84.2386 65.7287 83.6374L23.7171 53.4291Z" fill="#748484" stroke="#4A5151"/>
<path d="M69.7427 74.2993L69.8413 74.3696L69.9493 74.3147L87.1606 65.5786L85.6509 71.647L69.6132 80.6733C68.5994 81.2438 67.3478 81.18 66.3974 80.5092L25.1847 51.4239L26.6509 45.5299L27.5791 44.2428L69.7427 74.2993Z" fill="white" stroke="#4A5151" stroke-width="0.4"/>
<path d="M69.7697 73.2177L69.8695 73.29L69.9789 73.2334L85.4019 65.2616L85.647 70.5845L69.6415 79.5926C68.6277 80.1632 67.3761 80.0993 66.4257 79.4286L25.213 50.3432L26.6549 44.5471L29.7205 44.2087L69.7697 73.2177Z" stroke="#4A5151" stroke-width="0.4"/>
<path d="M70.069 72.019L70.1559 72.0814L70.2561 72.0437L86.1457 66.0586L86.1978 69.3204L69.685 78.5434C68.8267 79.0228 67.7695 78.9671 66.9664 78.4003L25.5228 49.152L27.4313 43.6787L30.0219 43.2733L70.069 72.019Z" fill="white" stroke="#4A5151" stroke-width="0.4"/>
<rect x="0.844317" y="0.04633" width="23.0003" height="54.5218" rx="1.79545" transform="matrix(0.873567 -0.486705 0.815068 0.579365 22.694 46.3406)" fill="#748484" stroke="#4A5151"/>
<path d="M50.1783 64.6209L49.9606 64.7364L49.9196 64.9795L48.8481 71.3396L39.152 64.1266L40.6747 58.0072L61.0021 47.066L70.4658 53.8562L50.1783 64.6209Z" fill="white" stroke="#4A5151"/>
<path d="M56.6367 55.992L56.0167 56.482L56.8522 57.1183L56.1017 57.7114L55.2165 57.0373C54.6116 57.3784 54.0185 57.5091 53.4372 57.4293C52.8615 57.3537 52.2262 57.0514 51.5313 56.5222L51.0989 56.8639C50.8433 57.0659 50.6945 57.2648 50.6524 57.4606C50.6159 57.6607 50.7272 57.8594 50.9864 58.0568C51.2345 58.2458 51.4818 58.3285 51.728 58.3051C51.9797 58.2773 52.2388 58.1581 52.5053 57.9476L53.5807 58.7665C53.0204 59.1922 52.4417 59.4056 51.8447 59.4067C51.2531 59.4035 50.6761 59.1877 50.1136 58.7593C49.529 58.3142 49.2373 57.8515 49.2385 57.3713C49.2397 56.8912 49.5367 56.4168 50.1295 55.9484L51.2145 55.091C51.8046 55.5403 52.2538 55.8614 52.5623 56.054C52.8762 56.2424 53.151 56.3505 53.3868 56.3781C53.6225 56.4057 53.8712 56.3504 54.1329 56.2121L51.6595 54.3285L52.41 53.7354L54.9248 55.6505L55.5448 55.1605L53.0301 53.2454L53.8295 52.6136L58.2717 55.9965L57.4722 56.6283L56.6367 55.992Z" fill="#707777"/>
</g>
<defs>
<filter id="filter0_dd_3554_1549" x="0.551758" y="0.9375" width="141.159" height="125.57" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="11" dy="1"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.290196 0 0 0 0 0.317647 0 0 0 0 0.317647 0 0 0 1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3554_1549"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="16" dy="4"/>
<feGaussianBlur stdDeviation="19"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.454902 0 0 0 0 0.517647 0 0 0 0 0.517647 0 0 0 1 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_3554_1549" result="effect2_dropShadow_3554_1549"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_3554_1549" result="shape"/>
</filter>
</defs>
</svg>

                    </div>
                ) : cardType === "house" ? (
                    <div className='absolute top-[10%] left-[30%] '>
                        <svg width="68" height="51" viewBox="0 0 68 51" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.8926 31.4127L48.6475 50.3468V33.4455L15.8926 14.5117V31.4127Z" fill="#DCCFC7"/>
<path d="M64.527 24.2787L56.5867 19.6914L48.6465 33.4474V50.3486L64.527 41.1798V24.2787Z" fill="white"/>
<path d="M12.9141 16.2327L47.654 36.3125L57.5794 20.287L22.8393 0.207031L12.9141 16.2327Z" fill="#748484"/>
<path d="M22.8398 0.207031L57.5799 20.287L67.5053 24.8518L32.7652 4.77198L22.8398 0.207031Z" fill="#748484"/>
<path d="M12.9141 17.3804L47.654 37.4603V36.3142L12.9141 16.2344V17.3804Z" fill="#035782"/>
<path d="M47.6543 36.3146V37.4608L57.5796 21.4352V20.2891L47.6543 36.3146Z" fill="#053148"/>
<path d="M67.5054 24.8539L57.5801 20.2891V21.4352L67.5054 26V24.8539Z" fill="#053148"/>
<path d="M3.94727 38.3146L17.8454 46.339V30.4287L10.9032 19.3867L3.94727 22.4183V38.3146Z" fill="#DCCFC7"/>
<path d="M29.7844 39.4458V24.5469L17.8438 31.4422V46.3414L29.7844 39.4458Z" fill="#FEEEE4"/>
<path d="M18.834 34.5277L30.7444 27.5758V26.4297L18.834 33.3817V34.5277Z" fill="#053148"/>
<path d="M7.67188 39.951L12.6026 42.7806L12.913 42.5991L7.98232 39.7695L7.67188 39.951Z" fill="#725546"/>
<path d="M7.98232 39.7659L7.98452 29.4688L7.67408 29.6502L7.67188 39.9474L7.98232 39.7659Z" fill="#6E5244"/>
<path d="M7.67188 39.9534L12.6026 42.783L12.6048 32.4859L7.67408 29.6562L7.67188 39.9534Z" fill="#748484"/>
<path d="M12.9101 42.5979L12.9123 32.3008L12.6018 32.4823L12.5996 42.7794L12.9101 42.5979Z" fill="#775F40"/>
<path d="M7.67383 29.6502L12.6045 32.4799L12.915 32.2984L7.98427 29.4688L7.67383 29.6502Z" fill="#AC885E"/>
<path d="M13.2675 43.573L13.2698 32.0938L12.9595 32.2754L12.957 43.7545L13.2675 43.573Z" fill="#918F93"/>
<path d="M7.31641 29.0448L12.9578 32.2822L13.2681 32.1006L7.62674 28.8633L7.31641 29.0448Z" fill="#BFBFC1"/>
<path d="M7.31445 40.5221L12.9558 43.7595L12.9583 32.2803L7.31689 29.043L7.31445 40.5221ZM7.67198 29.6544L12.6027 32.4838L12.6005 42.781L7.66978 39.9515L7.67198 29.6544Z" fill="#F1F2F2"/>
<path d="M18.8327 33.3811L9.9082 19.9844V21.1305L18.8327 34.5272V33.3811Z" fill="#035782"/>
<path d="M18.8327 33.3829L30.7432 26.4544V7.89062L9.9082 19.9862L18.8327 33.3829Z" fill="#748484"/>
<path d="M12.838 16.2723L1.00977 23.0707L9.91006 19.9875L30.7193 7.9375L12.838 16.2723Z" fill="#035782"/>
<path d="M34.582 27.3148L43.6979 32.578V26.6902H43.7034L39.1705 19.4805L34.582 21.4803V27.3148Z" fill="#DCCFC7"/>
<path d="M45.5331 31.5303V27.1172L43.6875 28.1663V32.5797L45.5331 31.5303Z" fill="#FEEEE4"/>
<path d="M44.6055 30.5898L46.4307 29.5226V28.4766L44.6055 29.5438V30.5898Z" fill="#035782"/>
<path d="M44.6047 29.5431L38.2656 20.0273V21.0734L44.6047 30.5891V29.5431Z" fill="#035782"/>
<path d="M46.4299 28.5129V15.3594L38.2656 20.0244L44.6058 29.5419L46.4299 28.5129Z" fill="#748484"/>
<path d="M37.5216 19.4745L33.7383 21.5924L38.2645 20.0244L46.4287 15.3594L37.5216 19.4745Z" fill="#035782"/>
<path d="M33.7344 21.5971V22.6431L38.2657 21.0734V20.0273L33.7344 21.5971Z" fill="#053148"/>
<path d="M0.96875 23.0816V24.2276L9.90975 21.1305V19.9844L0.96875 23.0816Z" fill="#053148"/>
</svg>

                    </div>
                ) : (
                    <div className="absolute top-[14%] left-[29%]">
                        <svg width="70" height="51" viewBox="0 0 70 51" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_3554_1589)">
<rect y="0.486286" width="6.30687" height="46.6215" rx="3.15344" transform="matrix(0.8738 0.486286 -0.8738 0.486286 52.0362 8.25372)" fill="#01C8A9" stroke="#01C8A9"/>
<rect x="0.8738" width="6.30687" height="46.6215" rx="3.15344" transform="matrix(0.8738 -0.486286 0.8738 0.486286 10.1103 11.9796)" fill="#01C8A9" stroke="#01C8A9"/>
</g>
<rect x="33.2324" y="20.457" width="3.44922" height="3.34375" transform="rotate(61.4922 33.2324 20.457)" fill="#01C8A9"/>
<rect x="38.0176" y="17.7422" width="3.44922" height="3.34375" transform="rotate(57.6755 38.0176 17.7422)" fill="#01C8A9"/>
<rect width="3.44922" height="3.34375" transform="matrix(-0.858718 0.512449 0.512449 0.858718 31.4082 20.0898)" fill="#01C8A9"/>
<rect width="3.44922" height="3.30701" transform="matrix(-0.870751 0.491724 0.491724 0.870751 36.3887 17.4414)" fill="#01C8A9"/>
<defs>
<filter id="filter0_d_3554_1589" x="0.170117" y="0.342969" width="69.6559" height="50.0328" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="1" dy="4"/>
<feGaussianBlur stdDeviation="6.35"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0.0901961 0 0 0 0 0.596078 0 0 0 0 0.6 0 0 0 0.36 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3554_1589"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3554_1589" result="shape"/>
</filter>
</defs>
</svg>
                    </div>
                )}
                <div className="absolute top-[2px] left-[40px]">
                    {children}
                </div>
                {/* Arrows */}
                {index === 2 && (
                    <div className='md:hidden absolute left-0 -top-6'>
                        {goals.arrowLeftRight}
                    </div>
                )}
                {type !== "new" && evenOdd === "odd" && (
                    <div className='hidden md:flex absolute left-[-35%] top-[80%]'>
                        {goals.arrowLeftRight}
                    </div>
                )}
                {/* {type !== "new" && evenOdd === "odd" && index === 3 && (
                    <div className='absolute left-[-15%] top-[80%]'>
                        {goals.arrowLeftRight}
                    </div>
                )} */}
                {type !== "new" && evenOdd === "even" && (
                    <div className='absolute left-[100%] top-[86%]'>
                        {goals.arrowBottom}
                    </div>
                )}
                {index > 1 && evenOdd === "odd" && (
                    <div className='md:hidden absolute -right-4 bottom-0'>
                        {goals.arrowLeftRight}
                    </div>
                )}
                {type !== "new" && evenOdd === "even" && (
                    <div className='md:hidden absolute -left-4 bottom-0'>
                        {goals.arrowBottom}
                    </div>
                )}
            </div>
        </div>
    )
}
