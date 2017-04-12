package com.ddout.fb.service.buss.impl;

import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdhy.commons.utils.ParamsUtil;
import com.ddout.fb.dao.buss.IRpt1Mapper;
import com.ddout.fb.service.buss.IRpt1Service;

@Service
public class Rpt1ServiceImpl implements IRpt1Service {
    @Autowired
    private IRpt1Mapper mapper;

    @Override
    public Map<String, Object> list(Map<String, Object> parm) {
	List<Map<String, Object>> list1 = mapper.queryTp1List(parm);
	List<Map<String, Object>> list2 = mapper.queryTp2List(parm);
	List<Map<String, Object>> list3 = mapper.queryTp3List(parm);
	//
	BigDecimal item_num = new BigDecimal(0);
	BigDecimal item_num2 = new BigDecimal(0);
	BigDecimal item_weight = new BigDecimal(0);
	BigDecimal item_je = new BigDecimal(0);
	for (Map<String, Object> map : list1) {
	    // 4
	    try {
		item_num = item_num.add(new BigDecimal(ParamsUtil.getString4Map(map, "item_num")),
			MathContext.DECIMAL128);
		item_num2 = item_num2.add(new BigDecimal(ParamsUtil.getString4Map(map, "item_num2")),
			MathContext.DECIMAL128);
		item_weight = item_weight.add(new BigDecimal(ParamsUtil.getString4Map(map, "item_weight")),
			MathContext.DECIMAL128);
		item_je = item_je.add(new BigDecimal(ParamsUtil.getString4Map(map, "item_je")), MathContext.DECIMAL128);
	    } catch (Exception e) {
	    }
	}
	Map<String, Object> map1 = new HashMap<String, Object>();
	map1.put("itemmodel", "合计");
	map1.put("item_num", item_num.setScale(0, RoundingMode.HALF_DOWN).stripTrailingZeros().floatValue());
	map1.put("item_num2", item_num2.setScale(0, RoundingMode.HALF_DOWN).stripTrailingZeros().floatValue());
	map1.put("item_weight", item_weight.setScale(6, RoundingMode.HALF_DOWN).stripTrailingZeros().floatValue());
	map1.put("item_je", item_je.setScale(6, RoundingMode.HALF_DOWN).stripTrailingZeros().floatValue());
	list1.add(map1);
	//
	//
	BigDecimal item_num_2 = new BigDecimal(0);
	BigDecimal item_num2_2 = new BigDecimal(0);
	BigDecimal item_weight_2 = new BigDecimal(0);
	BigDecimal item_je_2 = new BigDecimal(0);
	BigDecimal item_zdje_2 = new BigDecimal(0);
	BigDecimal item_cj_2 = new BigDecimal(0);
	BigDecimal item_bc_2 = new BigDecimal(0);
	BigDecimal item_drxkj_2 = new BigDecimal(0);
	for (Map<String, Object> map : list2) {
	    // 4
	    try {
		item_num_2 = item_num_2.add(new BigDecimal(ParamsUtil.getString4Map(map, "item_num")),
			MathContext.DECIMAL128);
		item_num2_2 = item_num2_2.add(new BigDecimal(ParamsUtil.getString4Map(map, "item_num2")),
			MathContext.DECIMAL128);
		item_weight_2 = item_weight_2.add(new BigDecimal(ParamsUtil.getString4Map(map, "item_weight")),
			MathContext.DECIMAL128);
		item_je_2 = item_je_2.add(new BigDecimal(ParamsUtil.getString4Map(map, "item_je")),
			MathContext.DECIMAL128);
		item_zdje_2 = item_zdje_2.add(new BigDecimal(ParamsUtil.getString4Map(map, "item_zdje")),
			MathContext.DECIMAL128);
		item_cj_2 = item_cj_2.add(new BigDecimal(ParamsUtil.getString4Map(map, "item_cj")),
			MathContext.DECIMAL128);
		item_bc_2 = item_bc_2.add(new BigDecimal(ParamsUtil.getString4Map(map, "item_bc")),
			MathContext.DECIMAL128);
		item_drxkj_2 = item_drxkj_2.add(new BigDecimal(ParamsUtil.getString4Map(map, "item_drxkj")),
			MathContext.DECIMAL128);
	    } catch (Exception e) {
	    }
	}
	Map<String, Object> map2 = new HashMap<String, Object>();
	map2.put("itemmodel", "合计");
	map2.put("item_num", item_num_2.setScale(0, RoundingMode.HALF_DOWN).stripTrailingZeros().floatValue());
	map2.put("item_num2", item_num2_2.setScale(0, RoundingMode.HALF_DOWN).stripTrailingZeros().floatValue());
	map2.put("item_weight", item_weight_2.setScale(6, RoundingMode.HALF_DOWN).stripTrailingZeros().floatValue());
	map2.put("item_je", item_je_2.setScale(6, RoundingMode.HALF_DOWN).stripTrailingZeros().floatValue());
	map2.put("item_zdje", item_zdje_2.setScale(6, RoundingMode.HALF_DOWN).stripTrailingZeros().floatValue());
	map2.put("item_drxkj", item_drxkj_2.setScale(6, RoundingMode.HALF_DOWN).stripTrailingZeros().floatValue());
	map2.put("item_cj", item_cj_2.setScale(6, RoundingMode.HALF_DOWN).stripTrailingZeros().floatValue());
	map2.put("item_bc", item_bc_2.setScale(6, RoundingMode.HALF_DOWN).stripTrailingZeros().floatValue());

	list2.add(map2);
	//
	//
	BigDecimal f_dw = new BigDecimal(0);
	BigDecimal f_je = new BigDecimal(0);
	for (Map<String, Object> map : list3) {
	    // 4
	    try {
		f_dw = f_dw.add(new BigDecimal(ParamsUtil.getString4Map(map, "f_dw")), MathContext.DECIMAL128);
		f_je = item_je.add(new BigDecimal(ParamsUtil.getString4Map(map, "f_je")), MathContext.DECIMAL128);
	    } catch (Exception e) {
	    }
	}
	Map<String, Object> map3 = new HashMap<String, Object>();
	map3.put("modify_user", "合计");
	map3.put("f_dw", f_dw.setScale(6, RoundingMode.HALF_DOWN).stripTrailingZeros().floatValue());
	map3.put("f_je", f_je.setScale(6, RoundingMode.HALF_DOWN).stripTrailingZeros().floatValue());
	list3.add(map3);
	//
	Map<String, Object> result = new HashMap<String, Object>();
	result.put("data_tp1", list1);
	result.put("data_tp2", list2);
	result.put("data_tp3", list3);
	return result;
    }

}
