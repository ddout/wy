package com.ddout.fb.dao.buss;

import java.util.List;
import java.util.Map;

public interface IEnterMapper {

    int queryItemsListCount(Map<String, Object> parm);

    List<Map<String, Object>> queryItemsList(Map<String, Object> parm);

}
