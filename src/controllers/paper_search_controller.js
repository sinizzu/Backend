const axios = require('axios');
require('dotenv').config();
const MAIN_FASTAPI_URL = process.env.MAIN_FASTAPI_URL;




// 검색 키워드를 이용한 검색 함수
async function searchKeyword(searchword) {
    try {
        const response = await axios.get(`${MAIN_FASTAPI_URL}/api/paper/searchKeyword`, {
            params: {
                searchword: searchword
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching searchKeyword:', error);
        throw error;
    }
}
// 구어체 기반 검색 함수
async function searchColl(searchword) {
    try {
        const response = await axios.get(`${MAIN_FASTAPI_URL}/api/paper/searchColl`, {
            params: {
                searchword: searchword
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching getColl:', error);
        throw error;
    }
}


// 모듈 내보내기
module.exports = {
    searchKeyword,
    searchColl
};