package com.ddout.fb.service.buss;

import java.util.Map;

import com.cdhy.commons.utils.model.Page;
/**
 * 供应商
 * @author ddout
 *
 */
public interface ISupplierService {

    Page list(Map<String, Object> parm);

    void add(Map<String, Object> parm);

    void update(Map<String, Object> parm);

    void del(Map<String, Object> parm);
    Map<String, Object> getById(Map<String, Object> parm);
}
