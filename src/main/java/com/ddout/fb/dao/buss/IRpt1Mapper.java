package com.ddout.fb.dao.buss;

import java.util.List;
import java.util.Map;

public interface IRpt1Mapper {

    List<Map<String, Object>> queryTp1List(Map<String, Object> parm);

    List<Map<String, Object>> queryTp2List(Map<String, Object> parm);

    List<Map<String, Object>> queryTp3List(Map<String, Object> parm);

}
