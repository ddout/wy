package com.ddout;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.webAppContextSetup;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.web.context.WebApplicationContext;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration({ "classpath*:conf/spring*.xml" })
public class TestBussStorageEnter {

    @Autowired
    private WebApplicationContext wac;

    private MockMvc mockMvc;

    @Before
    public void setup() {
	this.mockMvc = webAppContextSetup(this.wac).build();
    }

    @Test
    public void testList() throws Exception {
	//
	MockHttpServletRequestBuilder mock = post("/Buss/Storage/list.do").characterEncoding("UTF-8")
		.contentType(MediaType.APPLICATION_JSON);
	mock.param("start", "1").param("limit", "10");
	ResultActions ra = mockMvc.perform(mock).andExpect(status().isOk()).andDo(print());
	JSONObject result = JSONObject.fromObject(ra.andReturn().getResponse().getContentAsString());
	System.out.println(result);
    }

    @Test
    public void testAdd() throws Exception {
	//
	MockHttpServletRequestBuilder mock = post("/Buss/Storage/add.do").characterEncoding("UTF-8")
		.contentType(MediaType.APPLICATION_JSON);
	mock.param("houseid", "1").param("modify_time", "2015-06-05").param("note", "note22")
		.param("modify_username", "modify_username").param("items", buildDatas(3).toString());
	ResultActions ra = mockMvc.perform(mock).andExpect(status().isOk()).andDo(print());
	JSONObject result = JSONObject.fromObject(ra.andReturn().getResponse().getContentAsString());
	System.out.println(result);
    }

    @Test
    public void testDel() throws Exception {
	//
	MockHttpServletRequestBuilder mock = post("/Buss/Storage/del.do").characterEncoding("UTF-8")
		.contentType(MediaType.APPLICATION_JSON);
	mock.param("id", "1");
	ResultActions ra = mockMvc.perform(mock).andExpect(status().isOk()).andDo(print());
	JSONObject result = JSONObject.fromObject(ra.andReturn().getResponse().getContentAsString());
	System.out.println(result);
    }

    @Test
    public void testUpdate() throws Exception {
	//
	MockHttpServletRequestBuilder mock = post("/Buss/Storage/update.do").characterEncoding("UTF-8")
		.contentType(MediaType.APPLICATION_JSON);
	mock.param("id", "1");
	mock.param("houseid", "2").param("modify_time", "2015-06-05").param("note", "note3123123")
		.param("modify_username", "modify_username2").param("items", buildDatas(10).toString());
	ResultActions ra = mockMvc.perform(mock).andExpect(status().isOk()).andDo(print());
	JSONObject result = JSONObject.fromObject(ra.andReturn().getResponse().getContentAsString());
	System.out.println(result);
    }

    private JSONArray buildDatas(int len) {
	JSONArray items = new JSONArray();
	for (int i = 0; i < len; i++) {
	    JSONObject item = new JSONObject();
	    item.put("supplierid", 1);
	    item.put("itemid", 1);
	    item.put("item_num", 10);
	    item.put("item_num2", 23);
	    item.put("item_weight", 13.1);
	    item.put("item_dj", 52.2);
	    item.put("item_je", 54.13);
	    item.put("item_note", "item_note_" + i);
	    items.add(item);
	}
	return items;
    }
}
