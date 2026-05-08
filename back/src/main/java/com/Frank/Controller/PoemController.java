package  com.Frank.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@RestController
@RequestMapping("/poem")
public class PoemController {

    @PostMapping("/setpoem")
    public String upload(@RequestParam("file") MultipartFile file) {

        if (file.isEmpty()) {
            return "文件不能为空";
        }

        String filename = file.getOriginalFilename();
        String contentType = file.getContentType();

        if (!(filename.endsWith(".doc") || filename.endsWith(".docx"))) {
            return "只支持 .doc 或 .docx 文件";
        }

        if (!(contentType.equals("application/msword") ||
                contentType.equals(
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"))) {
            return "文件类型不合法";
        }

        try {
            // 1️⃣ 先读取内容（**重点**）
            String content;
            if (filename.endsWith(".docx")) {
                content = com.Frank.Util.PoemUtil.readDocx(file.getInputStream());
            } else {
                content = com.Frank.Util.PoemUtil.readDoc(file.getInputStream());
            }

            // 2️⃣ 再保存文件（可选）
            file.transferTo(
                    new File("E:/houduan/untitled1_files/" + filename));

            // 3️⃣ 返回文件内容
            return content;

        } catch (Exception e) {
            return "解析失败：" + e.getMessage();
        }
    }

}