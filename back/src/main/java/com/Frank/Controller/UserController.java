package com.Frank.Controller;

import com.Frank.Entity.User;
import com.Frank.Mapper.UserMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    // ✅ 只允许字母和数字，长度 3-20（注意：包含 0！）
    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[a-zA-Z0-9]{3,20}$");

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * 用户注册
     */
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody User user) {
        try {
            String username = user.getUsername();
            String password = user.getPassword();

            // 校验输入
            if (username == null || password == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "用户名或密码不能为空"));
            }

            if (!USERNAME_PATTERN.matcher(username).matches()) {
                return ResponseEntity.badRequest().body(Map.of("error", "用户名只能包含英文字母和数字，长度3-20"));
            }

            if (password.length() < 6) {
                return ResponseEntity.badRequest().body(Map.of("error", "密码至少6位"));
            }

            // 检查是否已存在
            if (userMapper.findUser(username) != null) {
                return ResponseEntity.badRequest().body(Map.of("error", "用户名已存在"));
            }

            // 加密并保存
            String encodedPassword = passwordEncoder.encode(password);
            int result = userMapper.insertUser(username, encodedPassword);

            if (result > 0) {
                return ResponseEntity.ok(Map.of("message", "注册成功"));
            } else {
                return ResponseEntity.status(500).body(Map.of("error", "注册失败，请重试"));
            }

        } catch (Exception e) {
            log.error("注册异常: username={}", user.getUsername(), e);
            return ResponseEntity.status(500).body(Map.of("error", "服务器内部错误"));
        }
    }
    private void sleepTo(long targetMs, long startTime) {
        long elapsed = System.currentTimeMillis() - startTime;
        long remain = targetMs - elapsed;
        if (remain > 0) {
            try {
                Thread.sleep(remain);
            } catch (InterruptedException ignored) {}
        }
    }

    /**
     * 用户登录
     */
    @PostMapping("/login")

    public ResponseEntity<?> login(@RequestBody User user) {
        long startTime = System.currentTimeMillis(); // ⏱ 统一计时起点

        try {
            String username = user.getUsername();
            String password = user.getPassword();

            if (username == null || password == null) {
                sleepTo(800, startTime);
                return ResponseEntity.badRequest().body(Map.of("error", "用户名或密码不能为空"));
            }

            if (!USERNAME_PATTERN.matcher(username).matches()) {
                sleepTo(800, startTime);
                return ResponseEntity.badRequest().body(Map.of("error", "用户名或密码错误"));
            }

            User userInDB = userMapper.findUser(username);

            boolean success = false;
            if (userInDB != null) {
                success = passwordEncoder.matches(password, userInDB.getPassword());
            }

            if (!success) {
                // ❗失败惩罚：额外 sleep 500ms
                Thread.sleep(500);

                sleepTo(800, startTime);
                return ResponseEntity.status(401).body(Map.of("error", "用户名或密码错误"));
            }

            // 成功登录
            userInDB.setPassword(null);
            sleepTo(800, startTime);
            return ResponseEntity.ok(Map.of("user", userInDB));

        } catch (Exception e) {
            log.error("登录异常", e);
            sleepTo(800, startTime);
            return ResponseEntity.status(500).body(Map.of("error", "服务器内部错误"));
        }
    }

}