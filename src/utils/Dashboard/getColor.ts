export const getColor = (score: number, total?: boolean) => {
    if (total) {
        if (score <= 30) {
            return "#ef4444"
        } else if (score <= 70) {
            return "#fb923c"
        } else {
            return "#16a34a"
        }
    }
    if(score <= 4){
        return "#DA2B2B"
    }else if(score <= 6){
        return "#FF7300"
    }else if(score <= 8){
        return "#F2C605"
    }else{
        return "#0FD28C"
    }
}