package com.ddout.fb.service.buss;

import java.util.Map;

import com.cdhy.commons.utils.model.Page;
/**
 * 单位
 * @author ddout
 *
 */
public interface IEnterService {

    Page list(Map<String, Object> parm);

    void add(Map<String, Object> parm);

    void update(Map<String, Object> parm);

    void del(Map<String, Object> parm);

    Map<String, Object> getById(Map<String, Object> parm);


}
