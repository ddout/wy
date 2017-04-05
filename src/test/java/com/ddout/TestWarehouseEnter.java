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

import net.sf.json.JSONObject;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration({ "classpath*:conf/spring*.xml" })
public class TestWarehouseEnter {

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
	MockHttpServletRequestBuilder mock = post("/Warehouse/list.do").characterEncoding("UTF-8")
		.contentType(MediaType.APPLICATION_JSON);
	mock.param("start", "1").param("limit", "10").param("name", "试");
	ResultActions ra = mockMvc.perform(mock).andExpect(status().isOk()).andDo(print());
	JSONObject result = JSONObject.fromObject(ra.andReturn().getResponse().getContentAsString());
	System.out.println(result);
    }

    @Test
    public void testAdd() throws Exception {
	//
	MockHttpServletRequestBuilder mock = post("/Warehouse/add.do").characterEncoding("UTF-8")
		.contentType(MediaType.APPLICATION_JSON);
	mock.param("name", "测试我的哈哈哈")
	.param("note", "note2")
	.param("enterid", "1")
	.param("address", "address")
	.param("heads", "heads")
	.param("heads_phone", "heads_phone");
	ResultActions ra = mockMvc.perform(mock).andExpect(status().isOk()).andDo(print());
	JSONObject result = JSONObject.fromObject(ra.andReturn().getResponse().getContentAsString());
	System.out.println(result);
    }

    @Test
    public void testDel() throws Exception {
	//
	MockHttpServletRequestBuilder mock = post("/Warehouse/del.do").characterEncoding("UTF-8")
		.contentType(MediaType.APPLICATION_JSON);
	mock.param("id", "1");
	ResultActions ra = mockMvc.perform(mock).andExpect(status().isOk()).andDo(print());
	JSONObject result = JSONObject.fromObject(ra.andReturn().getResponse().getContentAsString());
	System.out.println(result);
    }

    @Test
    public void testUpdate() throws Exception {
	//
	MockHttpServletRequestBuilder mock = post("/Warehouse/update.do").characterEncoding("UTF-8")
		.contentType(MediaType.APPLICATION_JSON);
	mock.param("id", "1")
	.param("name", "阿大声道")
	.param("note", "note222222222")
	.param("enterid", "1")
	.param("address", "address222222")
	.param("heads", "heads2222222")
	.param("heads_phone", "heads_phone2222");
	ResultActions ra = mockMvc.perform(mock).andExpect(status().isOk()).andDo(print());
	JSONObject result = JSONObject.fromObject(ra.andReturn().getResponse().getContentAsString());
	System.out.println(result);
    }
}
