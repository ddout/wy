package com.ddout.fb.service.buss;

import java.util.List;
import java.util.Map;

import com.cdhy.commons.utils.model.Page;
/**
 * 仓库
 * @author ddout
 *
 */
public interface IWarehouseService {

    Page list(Map<String, Object> parm);

    void add(Map<String, Object> parm);

    void update(Map<String, Object> parm);

    void del(Map<String, Object> parm);
    Map<String, Object> getById(Map<String, Object> parm);

    List<Map<String, Object>> getTreeData(Map<String, Object> parm);
}
