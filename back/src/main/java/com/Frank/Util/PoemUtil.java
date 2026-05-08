package com.Frank.Util;

import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.hwpf.extractor.WordExtractor;

import java.io.InputStream;
import java.util.stream.Collectors;

public class PoemUtil {

    // 读取 .docx
    public static String readDocx(InputStream is) throws Exception {
        XWPFDocument doc = new XWPFDocument(is);
        return doc.getParagraphs()
                .stream()
                .map(p -> p.getText())
                .collect(Collectors.joining("\n"));
    }

    // 读取 .doc
    public static String readDoc(InputStream is) throws Exception {
        HWPFDocument doc = new HWPFDocument(is);
        WordExtractor extractor = new WordExtractor(doc);
        return extractor.getText();
    }
}

