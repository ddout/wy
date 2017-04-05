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
import org.springframework.web.context.WebApplicationContext;

import net.sf.json.JSONObject;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration({ "classpath*:conf/spring*.xml" })
public class TestBussEnter {

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
	ResultActions ra = mockMvc.perform((post("/enter/list.do").characterEncoding("UTF-8")
		.contentType(MediaType.APPLICATION_JSON).param("start", "0").param("limit", "1")))
		.andExpect(status().isOk()).andDo(print());
	JSONObject result = JSONObject.fromObject(ra.andReturn().getResponse().getContentAsString());
	System.out.println(result);
    }
}
