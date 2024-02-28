function calculateFuziness(value) {
    if(value.length > 10) return 2;
    if(value.length > 5 || value.length < 10) return 1;
    return 0;
}
exports.buildQuery = (items) => {
    let matchItems = [];
    items.forEach(item => {
        let matchType = "";
        if(item.append){
            let operator = item.append === "and" ? "must" : "should";
            let innerItems = [];
            if(item.childs){
                item.childs.forEach(child => {
                    if(child.fields.length > 1){
                        matchType = "multi_match";
                        innerItems.push({
                            [matchType]: {
                                query: child.value,
                                fields: child.fields,
                                fuzziness: calculateFuziness(child.value)
                            }
                        })
                    }else{
                        matchType = "match";
                        innerItems.push({
                            [matchType]:{ 
                                [child.fields[0]]: {
                                    query: child.value, 
                                    fuzziness: calculateFuziness(child.value)
                            } }
                        })
                    }
                })
                matchItems.push({
                    bool: {
                        [operator]:innerItems
                    }
                })
            }
        }else{
            if(item.fields.length > 1){
                matchType = "multi_match";
                matchItems.push({
                    [matchType]: {
                        query: item.value,
                        fields: item.fields,
                        fuzziness: calculateFuziness(item.value)
                    }
                })
            }else{
                matchType = "match";
                matchItems.push({
                    [matchType]:{ 
                        [item.fields[0]]:{
                            query: item.value, 
                            fuzziness: calculateFuziness(item.value)
                        }
                    }
                })
            }
        }
    })
    return matchItems;
}