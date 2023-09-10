const getPagination = (page, size, defaultSize = '10') => {
    let pageStr = page
    let sizeStr = size
  
    if (pageStr && isNaN(pageStr)) {
      throw new Error(`page is NaN: ${page}`)
    }
  
    if (sizeStr && isNaN(sizeStr)) {
      throw new Error(`size is NaN: ${size}`)
    }
  
  
    let offset
    let limit = size ? +size : defaultSize
    if (page == '0' || page == '1') {
      offset = 0
    } else {
      offset = page ? --page * limit : '0'
    }
  
  
    if (size) {
      limit = limit.toString()
    }
  
    if (page) {
      offset = offset.toString()
    }
  
    return { limit, offset }
  }
  
  const getPagingData = (data, page, limit) => {
    const { total:count, data: results , totalData} = data
    const limited = parseInt(limit)
    let currentPage = page ? +page : 0
    if (currentPage <= 0) { currentPage = 1 }
    const totalPages = Math.ceil( totalData /limit)
    // console.log(totalPerPage)
    // console.log(total)
    // console.log(totalPages)
    if (totalPages <= 0) { currentPage = 1 }
    return { total:totalData, datePerPage:count, Pages:totalPages, currentPage, results }
  }
  
  module.exports = {
    getPagination,
    getPagingData
  }