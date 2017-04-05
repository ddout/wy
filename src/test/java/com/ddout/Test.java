package com.ddout;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class Test {
    public static void main(String[] args) throws Exception {
	Class.forName("com.mysql.jdbc.Driver");

	// 一开始必须填一个已经存在的数据库
	String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=utf-8";
	Connection conn = DriverManager.getConnection(url, "root", "root");
	Statement stat = conn.createStatement();
	// 创建数据库hello
	stat.executeUpdate("create database hello");
	// 关闭数据库
	stat.close();
	conn.close();
    }
}
