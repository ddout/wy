package com.ddout.fb.dao.buss;

import java.util.List;
import java.util.Map;

public interface IWarehouseMapper {

    int queryItemsListCount(Map<String, Object> parm);

    List<Map<String, Object>> queryItemsList(Map<String, Object> parm);

    void add(Map<String, Object> parm);

    Map<String, Object> queryItem(Map<String, Object> parm);

    void update(Map<String, Object> parm);

    void del(Map<String, Object> parm);

    Map<String, Object> getById(Map<String, Object> parm);

    List<Map<String, Object>> getTreeData(Map<String, Object> parm);
}
