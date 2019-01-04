# Excel模板导入器
### 1.首先实现 BasicExcelTemplateFactory 类的 register 方法
###### 然后使用templateClassMap注册你已经配置好的模板
```java
 public ExcelTempateFactory excelTempateFactory = new ExcelTempateFactory() {
    @Override
    protected void configTemplateAlias(Map<String, Class<? extends Serializable>> templateAlias) {
       // 这里在 templateClassMap 对象中注册你已经配置好的模板类
       // For example:
       // templateClassMap.put("模板的别名",模板类类型);
    }
 };

```
###### 当然你可以使用Spring注解配置方式将ExcelTemplateFactoryBean注册成为Java Bean
```java
 @Bean
 public class ExcelTempateFactoryBean extends ExcelTempateFactory{
    
    @Override
    protected void configTemplateAlias(Map<String, Class<? extends Serializable>> templateAlias) {
       // 这里在 templateClassMap 对象中注册你已经配置好的模板类
       // For example:
       // templateClassMap.put("模板的别名",模板类类型);
    }
 }

```
###### 在需要导入Excel模板时调用 bulider("模板的别名") 生成IExcelTemplate 用于导入你的Excel模板
```java
 IExcelTemplate excelTemplate = excelTempateFactory.bulider(code);
```
### 2.当然在进行第一步之前你需要配置好一个Excel模板类
##### 首先我们先了解下Excel模板注解配置
###### 以下注解用于配置在类信息上
* @SheetMapper 注解用于配置工作簿中的所需要导入的工作表的位置信息
    * index 属性用于定义工作表索引(默认读取第一个工作表)
    * title 属性工作表标题(设置该值后，如果找不到与该标题相对应的工作表则抛出异常)
* @MessageMapper 注解用于配置公共的验证结果消息模板信息 
    * template 属性默认为 "第${row}行${col}列错误,错误信息:'${name}' - ${message}" 其中几个常量表示为:
        * ${row} 当前行索引(从第一行开始,并非第零行)
        * ${col} 当前列索引(从第一列开始,并非第零行)
        * ${name} 当前错误信息所在哪列标题中,默认使用 @CellMapper 注解中的 displayName 属性 和 @TitleColMapper 注解中的 title 属性
        * ${message} IValidator接口的validator方法里有个ErrorContext类型,使用该对象就可以给当前该条数据注册错误信息
* @DateFormatMapper 注解用于配置Excel模板中的时间格式
    * format 属性默认为 yyyy/MM/dd 表示当需要转为时间格式时的时间格式
* @RangeMapper 注解用于配置工作表中数据行的范围信息
    * startRow 属性配置读取数据起始行(默认从第0列开始读取)
    * startCol 属性配置读取数据起始列(默认从第0列开始读取)
    * endColMark 属性配置结束读取列标记(当读取单元格遇到和该字符相同的内容时结束读取数据)
    * endRowMark 属性配置结束读取列标记(当读取标题列名遇到和该字符相同的内容时结束读取数据)
###### 以下注解用于配置在setter方法信息上
* @CacheMapper 注解声明属性值来自缓存中的数据(网点信息由数据库中取出并且保存在缓存中,当Excel模板解析器需要注入该属性时则从缓存中取出并且注入该值)
    * cacheKey 属性表示缓存中的KEY值,当注册了ICache缓存器后,ICache中有该key值时会将ICache中的对象注入到当前配置该注解的setter方法中
    * messsage 当注册的缓存器中不存在cacheKey的键值时报告的错误信息,该值会替代掉 @MessageMapper 中的${message}字符串
    * displayName 当注册的缓存器中不存在cacheKey的键值时报告错误信息的显示名称,该值会替代掉 @MessageMapper 中的${name}字符串
* @CellMapper 标示该注解后该属性的值由指定的单元格位置读取
    * row 单元格所在行
    * col 单元格所在列
    * displayName 当row,col所在的单元格不存在或者出现错误报告时显示的名称,该值会替代掉 @MessageMapper 中的${name}字符串
* @TitleColMapper 如果你的Excel数据有标题行,则使用该注解映射对应的标题名称,标题行的起始行为@RangeMapper 中配置的 startRow
    * title 标题名称
    * orTitle 备选标题名称(当不存在title标题时Excel模板解析器会再次查找orTitle标题)
* @NotNullMapper 验证该值是否为空(该注解必须与@CellMapper或@TitleColMapper配合使用)
    * value 表示空值的字符集合 比如 */0.0/空白字符 这些用于表示空白的字符
    * message 当该值为空时报告的错误信息,该值会替代掉 @MessageMapper 中的${message}字符串
* @CustomValidator 注解申明该值需要被验证通过后才能使用
    * validatorClass 表示自定义验证器的类类型,该自定义验证器必须实现IValidator接口,该验证器的实例是由Excel模板解析内部创建的,当你的验证器需要有外部Bean依赖时请选择配置cacheKey属性
    * cacheKey 用于配合Spring使用,当你的验证器需要被Bean对象管理器(Spring或者其他管理容器)所管理时,可以将该验证器先由外部Bean管理器创建该验证器实例后，再将它注册到缓存器中,Excel模板解析器会去缓存器中查找该验证器,而不会去创建它
