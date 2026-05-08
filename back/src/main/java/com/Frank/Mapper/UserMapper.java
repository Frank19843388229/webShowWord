package com.Frank.Mapper;

import com.Frank.Entity.User;
import org.apache.ibatis.annotations.*;
@Mapper
public interface UserMapper {

    @Select("SELECT * FROM t_user WHERE username = #{username}")
    User findUser(@Param("username") String username);

    @Insert("INSERT INTO t_user (username, password) VALUES (#{username}, #{password})")
    int insertUser(@Param("username") String username,
                   @Param("password") String encodedPassword);
}
