package com.ddout.fb.service.init.impl;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.stereotype.Service;

import com.ddout.fb.service.init.IInitService;

@Service
public class InitServiceImpl implements IInitService {
    private static final String dbName = "wy";

    @Override
    public boolean dbInit(String realPath) {
	createDb();
	// create tabels
	createTables(realPath);
	return true;
    }

    private static void createTables(String realPath) {
	String file = realPath + "\\WEB-INF\\classes\\conf\\init\\wy.sql";
	System.out.println(file);
	// 一开始必须填一个已经存在的数据库
	String command1 = "cmd /c call mysql -uroot -proot " + dbName + " < " + file;
	System.out.println(command1);
	StringBuilder sb = new StringBuilder();
	Process process = null;
	// String command1 = "service deploy-app-tomcats status";
	try {
	    System.out.println("shell exec info[" + command1 + "]");
	    process = Runtime.getRuntime().exec(command1);
	    process.waitFor();
	    InputStream in = process.getInputStream();
	    byte[] b = new byte[1024];
	    int len = -1;
	    while ((len = in.read(b)) != -1) {
		sb.append(new String(b, 0, len));
	    }
	} catch (Exception e) {
	    e.printStackTrace();
	    System.out.println("shell exec error[" + command1 + "]");
	}
	System.out.println(sb);
    }

    private static void createDb() {
	// 一开始必须填一个已经存在的数据库
	String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=utf-8";
	Connection conn = null;
	Statement stat = null;
	try {
	    Class.forName("com.mysql.jdbc.Driver");
	    conn = DriverManager.getConnection(url, "root", "root");
	    stat = conn.createStatement();
	    // 创建数据库hello
	    stat.executeUpdate("drop database if EXISTS " + dbName);
	    stat.executeUpdate("CREATE DATABASE " + dbName + " DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci");
	} catch (ClassNotFoundException e) {
	    throw new RuntimeException("数据库驱动加载异常", e);
	} catch (SQLException e) {
	    throw new RuntimeException("数据库创建有问题;检查数据库是否正常启动,root用户密码是否为root", e);
	} finally {
	    if (null != stat) {
		try {
		    stat.close();
		} catch (SQLException e) {
		    e.printStackTrace();
		}
	    }
	    if (null != conn) {
		try {
		    conn.close();
		} catch (SQLException e) {
		    e.printStackTrace();
		}
	    }
	}
	// 关闭数据库
    }

}
