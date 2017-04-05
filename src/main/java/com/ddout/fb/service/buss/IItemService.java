package com.ddout.fb.service.buss;

import java.util.Map;

import com.cdhy.commons.utils.model.Page;
/**
 * item
 * @author ddout
 *
 */
public interface IItemService {

    Page list(Map<String, Object> parm);

    void add(Map<String, Object> parm);

    void update(Map<String, Object> parm);

    void del(Map<String, Object> parm);
    Map<String, Object> getById(Map<String, Object> parm);
}